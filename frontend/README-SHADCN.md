# Shadcn UI Integration

This project has been configured to use [shadcn/ui](https://ui.shadcn.com/), a collection of reusable components built using Radix UI and Tailwind CSS.

## Available Components

We have integrated the following shadcn/ui components:

- Button - `@/components/ui/button.tsx`
- Card - `@/components/ui/card.tsx`
- Toast - `@/components/ui/toast.tsx` and `@/components/ui/use-toast.ts`

## Custom Theme

The project includes a custom board game themed design system with the following features:

- Custom color variables for board game elements (dice, meeples, cards, etc.)
- Custom background patterns (cardboard texture, linen texture)
- Dice animations and styling
- Board game themed button variants

## How to Use

### 1. Import Components

```tsx
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
```

### 2. Using Button Components

```tsx
// Standard variants
<Button variant="default">Default</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

// Board game themed variants
<Button variant="blue">Blue</Button>
<Button variant="purple">Purple</Button>
<Button variant="yellow">Yellow</Button>
<Button variant="wood">Wood</Button>
<Button variant="meeple">Meeple</Button>
<Button variant="cardboard">Cardboard</Button>
```

### 3. Using Cards

```tsx
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card Description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>

// Board game themed card
<Card className="bg-cardboard">
  {/* Card content */}
</Card>
```

### 4. Using Toasts

```tsx
// In your component:
const { toast } = useToast();

// Trigger a toast
toast({
  title: "Game Saved",
  description: "Your game has been saved successfully!",
  variant: "success", // Can be "default", "destructive", "success", "info", "warning"
});
```

## Adding More Components

To add more shadcn/ui components to your project:

1. Visit the [shadcn/ui components page](https://ui.shadcn.com/docs/components)
2. Create a new component file in `src/components/ui/`
3. Copy the component code from the shadcn/ui documentation
4. Customize as needed (add board game themed variants, etc.)

## Tailwind Configuration

The project uses a custom Tailwind configuration with:

- Container queries
- Board game themed colors
- Custom animations (dice roll)
- Custom utilities for board game UI elements

## Dark Mode Support

The project supports dark mode via the `.dark` class. To toggle dark mode, add the 'dark' class to the html element. 