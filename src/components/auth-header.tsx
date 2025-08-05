"use client"
import { useSession } from 'next-auth/react';
import React, { useState } from 'react'
import { Button } from './ui/button';
import {signIn} from '@/actions/sign-in';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import {LogOut, Loader2} from 'lucide-react'
import { Separator } from './ui/separator';
import { signOut } from '@/actions/sign-out';
const AuthHeader = () => {
    const session = useSession();
    const [isSigningOut, setIsSigningOut] = useState(false);
    const [isSigningIn, setIsSigningIn] = useState(false);
    if(session.status === "loading") return null;
    const handleSignOut = async () => {
        setIsSigningOut(true);
        try {
            await signOut();
        } finally {
            setIsSigningOut(false);
        }
    };
    const handleSignIn = async () => {
        setIsSigningIn(true);
        try {
            await signIn();
        } finally {
            setIsSigningIn(false);
        }
    };
    let authContent : React.ReactNode;
    if(session.data?.user){
          authContent = (
        <Popover>
            <PopoverTrigger asChild>
              <Avatar className="ring-2 ring-primary/20 hover:ring-primary/40 transition-all cursor-pointer">
            <AvatarImage src ={session.data.user.image || ''} alt={session.data.user.name || 'User Avatar'} />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                {session.data.user.name?.charAt(0) || 'U'}
            </AvatarFallback>
        </Avatar>
            </PopoverTrigger>
            <PopoverContent className="w-64 bg-card border-border shadow-xl">
                <div className="flex items-center gap-3 mb-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={session.data.user.image || ''} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                      {session.data.user.name?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {session.data.user.name || 'User'}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {session.data.user.email}
                    </p>
                  </div>
                </div>
                <Separator className='my-3'></Separator>
                <form action={handleSignOut}>
                <Button 
                    type='submit' 
                    variant="ghost" 
                    disabled={isSigningOut}
                    className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-500/10 disabled:opacity-50"
                >
                  {isSigningOut ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <LogOut className="w-4 h-4 mr-2" />
                  )}
                  {isSigningOut ? 'Signing Out...' : 'Sign Out'}
                </Button>
                </form>
            </PopoverContent>
        </Popover>
          ) 
}
else {
   authContent = (
        <div className="flex gap-2">
        <form action={handleSignIn}>
        <Button 
            variant='outline' 
            disabled={isSigningIn}
            className="border-border hover:bg-accent disabled:opacity-50"
        >
            {isSigningIn ? (
                <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Signing In...
                </>
            ) : (
                'Sign In'
            )}
        </Button>
         </form>
        <form action={handleSignIn}>
          <Button 
            disabled={isSigningIn}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50"
          >
            {isSigningIn ? (
                <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Signing Up...
                </>
            ) : (
                'Sign Up'
            )}
          </Button>
        </form>
        </div>
    )
}
  return authContent;
}
export default AuthHeader
