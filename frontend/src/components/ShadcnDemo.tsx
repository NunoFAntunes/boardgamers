import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

export default function ShadcnDemo() {
  const { toast } = useToast();

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold text-center mb-8">Shadcn UI Components</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1 - Button Showcase */}
        <Card>
          <CardHeader>
            <CardTitle>Button Variants</CardTitle>
            <CardDescription>
              Various button styles for your board game UI
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <div className="flex flex-wrap gap-2">
              <Button variant="default">Default</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button variant="blue">Blue</Button>
              <Button variant="purple">Purple</Button>
              <Button variant="yellow">Yellow</Button>
              <Button variant="wood">Wood</Button>
              <Button variant="meeple">Meeple</Button>
              <Button variant="cardboard">Cardboard</Button>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={() => {
                toast({
                  title: "Button Clicked",
                  description: "You clicked a button!",
                  variant: "default",
                });
              }}
            >
              Show Toast
            </Button>
          </CardFooter>
        </Card>

        {/* Card 2 - Toast Showcase */}
        <Card>
          <CardHeader>
            <CardTitle>Toast Notifications</CardTitle>
            <CardDescription>
              Display notifications to your users
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Button 
              variant="outline"
              onClick={() => {
                toast({
                  title: "Game Saved",
                  description: "Your game has been saved successfully!",
                  variant: "success",
                });
              }}
            >
              Success Toast
            </Button>
            <Button 
              variant="outline"
              onClick={() => {
                toast({
                  title: "Information",
                  description: "This is an informational message.",
                  variant: "info",
                });
              }}
            >
              Info Toast
            </Button>
            <Button 
              variant="outline"
              onClick={() => {
                toast({
                  title: "Warning",
                  description: "Your turn is about to end!",
                  variant: "warning",
                });
              }}
            >
              Warning Toast
            </Button>
            <Button 
              variant="outline"
              onClick={() => {
                toast({
                  title: "Error",
                  description: "Failed to connect to the game server.",
                  variant: "destructive",
                });
              }}
            >
              Error Toast
            </Button>
          </CardContent>
        </Card>

        {/* Card 3 - Board Game Theme */}
        <Card className="bg-cardboard">
          <CardHeader>
            <CardTitle>Board Game Themed UI</CardTitle>
            <CardDescription className="text-foreground/80">
              Custom styles for your board game app
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="dice flex justify-center items-center w-16 h-16 text-2xl">
                <div className="dice-dot absolute top-3 left-3"></div>
                <div className="dice-dot absolute top-3 right-3"></div>
                <div className="dice-dot absolute bottom-3 left-3"></div>
                <div className="dice-dot absolute bottom-3 right-3"></div>
                <div className="dice-dot absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
              </div>
              <div className="flex justify-center mt-4">
                <Button 
                  className="animate-dice-roll"
                  variant="wood"
                >
                  Roll Dice
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="cardboard" className="w-full">
              Start Game
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
} 