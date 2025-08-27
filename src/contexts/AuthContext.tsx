import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface Profile {
  id?: string;
  user_id: string;
  username: string | null;
  full_name: string | null;
  bio: string | null;
  avatar_url: string | null;
  created_at?: string;
  updated_at?: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  signUp: (email: string, password: string, fullName: string, username: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signInWithGoogle: () => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  updateProfile: (profileData: Partial<Profile>) => Promise<{ error: any }>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId: string) => {
    try {
      console.log('Fetching profile for user:', userId);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error);
        return;
      }

      if (data) {
        console.log('Profile data fetched:', data);
        setProfile(data);
      } else {
        console.log('No profile found, creating default profile');
        // Create default profile if none exists
        const { data: newProfile, error: createError } = await supabase
          .from('profiles')
          .insert({
            user_id: userId,
            username: user?.user_metadata?.username || '',
            full_name: user?.user_metadata?.full_name || '',
            bio: '',
            avatar_url: ''
          })
          .select()
          .single();

        if (!createError && newProfile) {
          console.log('Default profile created:', newProfile);
          setProfile(newProfile);
        } else if (createError) {
          console.error('Error creating default profile:', createError);
        }
      }
    } catch (error) {
      console.error('Error in fetchProfile:', error);
    }
  };

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user.id);
    }
  };

  const updateProfile = async (profileData: Partial<Profile>) => {
    if (!user) return { error: new Error('No user logged in') };

    try {
      // First check if username is being changed and if it conflicts with existing users
      if (profileData.username && profileData.username !== profile?.username) {
        const { data: existingUser, error: checkError } = await supabase
          .from('profiles')
          .select('user_id')
          .eq('username', profileData.username)
          .neq('user_id', user.id)
          .single();

        if (existingUser) {
          return { error: new Error('Username already taken. Please choose a different username.') };
        }
      }

      // Check if profile already exists
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('id')
        .eq('user_id', user.id)
        .single();

      let error;
      
      if (existingProfile) {
        // Profile exists, use UPDATE
        const { error: updateError } = await supabase
          .from('profiles')
          .update({
            ...profileData,
            updated_at: new Date().toISOString()
          })
          .eq('user_id', user.id);
        
        error = updateError;
      } else {
        // Profile doesn't exist, use INSERT
        const { error: insertError } = await supabase
          .from('profiles')
          .insert({
            user_id: user.id,
            ...profileData,
            updated_at: new Date().toISOString()
          });
        
        error = insertError;
      }

      if (error) {
        console.error('Profile update error:', error);
        if (error.code === '23505') { // Unique constraint violation
          return { error: new Error('Username already taken. Please choose a different username.') };
        }
        return { error };
      }

      // Update local profile state directly instead of refreshing
      if (profile) {
        setProfile({
          ...profile,
          ...profileData,
          updated_at: new Date().toISOString()
        });
      }

      return { error: null };
    } catch (error: any) {
      console.error('Error in updateProfile:', error);
      return { error };
    }
  };

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        try {
          setSession(session);
          setUser(session?.user ?? null);
          
          if (session?.user) {
            await fetchProfile(session.user.id);
          } else {
            setProfile(null);
          }
        } catch (error) {
          console.error('Error in auth state change:', error);
        } finally {
          setLoading(false);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      try {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          await fetchProfile(session.user.id);
        }
      } catch (error) {
        console.error('Error getting session:', error);
      } finally {
        setLoading(false);
      }
    });

    // Fallback timeout to prevent infinite loading
    const timeoutId = setTimeout(() => {
      console.warn('Auth loading timeout - forcing loading to false');
      setLoading(false);
    }, 5000); // 5 second timeout

    return () => {
      subscription.unsubscribe();
      clearTimeout(timeoutId);
    };
  }, []);

  const signUp = async (email: string, password: string, fullName: string, username: string) => {
    const redirectUrl = `${window.location.origin}/`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          full_name: fullName,
          username: username,
        }
      }
    });
    return { error };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/`
      }
    });
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const value = {
    user,
    session,
    profile,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    refreshProfile,
    updateProfile,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};