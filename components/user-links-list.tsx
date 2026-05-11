import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

interface Link {
  id: number;
  url: string;
  shortCode: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface UserLinksListProps {
  links: Link[];
}

export function UserLinksList({ links }: UserLinksListProps) {
  if (links.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Links Yet</CardTitle>
          <CardDescription>Create your first link to get started</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Your Links</h2>
      <div className="grid gap-4">
        {links.map((link) => (
          <Card key={link.id}>
            <CardHeader>
              <CardTitle className="text-lg">
                <code className="text-sm font-mono bg-muted px-2 py-1 rounded">
                  /{link.shortCode}
                </code>
              </CardTitle>
              <CardDescription className="break-all">{link.url}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">
                  Created {new Date(link.createdAt).toLocaleDateString()}
                </span>
                <Link href={`/${link.shortCode}`}>
                  <Button variant="outline" size="sm">
                    Visit
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
