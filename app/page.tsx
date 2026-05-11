import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Link2, BarChart3, Zap, Shield } from "lucide-react";

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  const features = [
    {
      icon: Link2,
      title: "Instant Link Shortening",
      description: "Convert long URLs into concise, shareable links in seconds.",
    },
    {
      icon: BarChart3,
      title: "Analytics & Insights",
      description: "Track clicks, sources, and user behavior for each shortened link.",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized performance ensures redirects happen instantly.",
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Your links are protected with enterprise-grade security.",
    },
  ];

  return (
    <div className="flex flex-col flex-1 min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-900 to-black">
      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center px-4 py-16 sm:py-24">
        <div className="w-full max-w-4xl text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
            Your Links,{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Simplified
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-zinc-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Create short, memorable links in seconds. Track performance, manage your URLs, and boost
            engagement with our powerful link shortening platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <SignUpButton>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Get Started Free
              </Button>
            </SignUpButton>
            <SignInButton>
              <Button size="lg" variant="outline" className="border-zinc-600 text-white hover:bg-zinc-800">
                Sign In
              </Button>
            </SignInButton>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-16 sm:py-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-4">
            Powerful Features
          </h2>
          <p className="text-center text-zinc-400 mb-16 max-w-2xl mx-auto">
            Everything you need to create, manage, and analyze your shortened links
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="bg-zinc-800/50 backdrop-blur border border-zinc-700 rounded-lg p-6 hover:border-blue-500/50 transition-colors"
                >
                  <div className="mb-4 p-3 bg-blue-600/10 rounded-lg w-fit">
                    <IconComponent className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16 sm:py-24 border-t border-zinc-800">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to shorten your links?
          </h2>
          <p className="text-zinc-400 mb-8">
            Join thousands of users who are already managing their links with us.
          </p>
          <SignUpButton>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Start for Free
            </Button>
          </SignUpButton>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-8 px-4">
        <div className="max-w-6xl mx-auto text-center text-zinc-500 text-sm">
          <p>&copy; 2026 Link Shortener. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
