'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const success = register(name, email, password);
    if (success) {
      toast({
        title: 'Account Created',
        description: "Welcome! We've logged you in.",
      });
      router.push('/dashboard');
    } else {
      toast({
        variant: 'destructive',
        title: 'Registration Failed',
        description: 'An account with this email already exists.',
      });
    }
  };

  return (
    <>
        <Header />
        <div className="container flex min-h-[80vh] items-center justify-center py-12">
            <Card className="mx-auto max-w-sm">
                <CardHeader>
                <CardTitle className="text-2xl">Create an account</CardTitle>
                <CardDescription>
                    Enter your information to create a new account.
                </CardDescription>
                </CardHeader>
                <CardContent>
                <form onSubmit={handleRegister} className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            placeholder="Your Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    </div>
                    <div className="grid gap-2">
                    <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                    </div>
                    <Input 
                        id="password" 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                    />
                    </div>
                    <Button type="submit" className="w-full">
                    Create Account
                    </Button>
                </form>
                </CardContent>
                <CardFooter className="text-center text-sm">
                    Already have an account?{' '}
                    <Link href="/login" className="underline ml-1">
                        Login
                    </Link>
                </CardFooter>
            </Card>
        </div>
        <Footer />
    </>
  );
}
