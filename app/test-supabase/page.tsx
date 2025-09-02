// app/test-supabase/page.tsx
"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from 'uuid';  // Make sure to install uuid package

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type UserData = {
  id?: string;
  email: string;
  created_at: string;
  updated_at: string;
};

type ErrorType = {
  message: string;
  details?: string;
};

export default function TestSupabasePage() {
  const [data, setData] = useState<UserData[]>([]);
  const [error, setError] = useState<ErrorType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const generateUniqueEmail = () => {
    const timestamp = new Date().getTime();
    return `test_user_${timestamp}_${uuidv4()}@example.com`;
  };

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from("users")
        .select("id, email, created_at, updated_at")
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;

      setData(data || []);
    } catch (err: any) {
      setError({
        message: "Failed to fetch users",
        details: err.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  const insertUser = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const uniqueEmail = generateUniqueEmail();
      
      // Use auth.signUp for proper user creation
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: uniqueEmail,
        password: `Test_${uuidv4()}_Password!23`
      });

      if (authError) throw authError;

      if (authData.user) {
        // Optional: Insert additional data into users table if needed
        const { error: userTableError } = await supabase
          .from("users")
          .upsert({
            id: authData.user.id,
            email: uniqueEmail,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          });

        if (userTableError) throw userTableError;
      }

      // Refetch data after successful insertion
      await fetchData();
    } catch (err: any) {
      setError({
        message: "Failed to insert user",
        details: err.message
      });
      console.error("User Insertion Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteAllTestUsers = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Retrieve and delete test users (be cautious with this in production)
      const { data: users, error: fetchError } = await supabase
        .from("users")
        .select("id, email")
        .ilike('email', 'test_user_%@example.com');

      if (fetchError) throw fetchError;

      for (const user of users) {
        // Delete from auth users
        const { error: authDeleteError } = await supabase.auth.admin.deleteUser(user.id);
        
        if (authDeleteError) {
          console.warn(`Failed to delete user ${user.id}:`, authDeleteError);
        }
      }

      await fetchData();
    } catch (err: any) {
      setError({
        message: "Failed to delete test users",
        details: err.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={{ 
      padding: 20, 
      fontFamily: 'Arial, sans-serif', 
      maxWidth: 800, 
      margin: '0 auto' 
    }}>
      <h1>Supabase Connection Test</h1>
      
      {error && (
        <div style={{ 
          color: 'red', 
          backgroundColor: '#ffeeee', 
          padding: 10, 
          borderRadius: 5,
          marginBottom: 15
        }}>
          <strong>Error:</strong> {error.message}
          {error.details && <p style={{ fontSize: '0.8em' }}>{error.details}</p>}
        </div>
      )}

      <div style={{ display: 'flex', gap: 10, marginBottom: 15 }}>
        <button 
          onClick={insertUser} 
          disabled={isLoading}
          style={{ 
            padding: '10px 15px', 
            backgroundColor: isLoading ? '#cccccc' : '#4CAF50', 
            color: 'white', 
            border: 'none', 
            borderRadius: 5 
          }}
        >
          {isLoading ? 'Processing...' : 'Insert Test User'}
        </button>
        
        <button 
          onClick={deleteAllTestUsers}
          disabled={isLoading}
          style={{ 
            padding: '10px 15px', 
            backgroundColor: isLoading ? '#cccccc' : '#f44336', 
            color: 'white', 
            border: 'none', 
            borderRadius: 5 
          }}
        >
          {isLoading ? 'Processing...' : 'Delete Test Users'}
        </button>
      </div>

      {data.length > 0 && (
        <div>
          <h2>Recent Users</h2>
          <table style={{ 
            width: '100%', 
            borderCollapse: 'collapse',
            marginTop: 10 
          }}>
            <thead>
              <tr style={{ backgroundColor: '#f2f2f2' }}>
                <th style={{ border: '1px solid #ddd', padding: 8 }}>ID</th>
                <th style={{ border: '1px solid #ddd', padding: 8 }}>Email</th>
                <th style={{ border: '1px solid #ddd', padding: 8 }}>Created At</th>
              </tr>
            </thead>
            <tbody>
              {data.map((user) => (
                <tr key={user.id}>
                  <td style={{ border: '1px solid #ddd', padding: 8 }}>{user.id}</td>
                  <td style={{ border: '1px solid #ddd', padding: 8 }}>{user.email}</td>
                  <td style={{ border: '1px solid #ddd', padding: 8 }}>
                    {new Date(user.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}