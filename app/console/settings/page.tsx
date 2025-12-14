"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Youtube, CreditCard, Palette, LogOut, Check } from "lucide-react"

export default function SettingsPage() {
  const { user, logout } = useAuth()
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="bg-secondary">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="channel">YouTube Channel</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="mb-6 text-lg font-semibold text-foreground">Profile Information</h3>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
              <Avatar className="h-20 w-20">
                <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
                <AvatarFallback className="bg-primary text-2xl text-primary-foreground">
                  {user?.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" defaultValue={user?.name} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue={user?.email} />
                  </div>
                </div>
                <Button
                  onClick={handleSave}
                  className="bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90"
                >
                  {saved ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Saved!
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="channel" className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="mb-6 text-lg font-semibold text-foreground">Connected YouTube Channel</h3>
            <div className="flex items-center gap-4 rounded-lg border border-border bg-secondary/30 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FF0000]/20">
                <Youtube className="h-6 w-6 text-[#FF0000]" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground">{user?.channelName || "TechWithAlex"}</p>
                <p className="text-sm text-muted-foreground">124,500 subscribers • 2.4M total views</p>
              </div>
              <Badge variant="secondary" className="bg-neon-green/20 text-neon-green">
                Connected
              </Badge>
            </div>
            <Button variant="outline" className="mt-4 bg-transparent">
              Reconnect Channel
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="billing" className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="mb-6 text-lg font-semibold text-foreground">Current Plan</h3>
            <div className="flex items-center justify-between rounded-lg border border-primary/50 bg-primary/5 p-4">
              <div>
                <p className="font-medium text-foreground">Creator Plan</p>
                <p className="text-sm text-muted-foreground">$19/month • Renews Jan 15, 2025</p>
              </div>
              <Badge className="bg-gradient-to-r from-primary to-accent text-primary-foreground">Active</Badge>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="mb-6 text-lg font-semibold text-foreground">Payment Method</h3>
            <div className="flex items-center gap-4 rounded-lg border border-border bg-secondary/30 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                <CreditCard className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium text-foreground">•••• •••• •••• 4242</p>
                <p className="text-sm text-muted-foreground">Expires 12/26</p>
              </div>
            </div>
            <Button variant="outline" className="mt-4 bg-transparent">
              Update Payment Method
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="mb-6 text-lg font-semibold text-foreground">Theme Preferences</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Palette className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium text-foreground">Dark Mode</p>
                  <p className="text-sm text-muted-foreground">Use dark theme across the app</p>
                </div>
              </div>
              <Switch defaultChecked />
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="mb-6 text-lg font-semibold text-foreground">Notifications</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive weekly performance reports</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Trend Alerts</p>
                  <p className="text-sm text-muted-foreground">Get notified about trending topics</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-destructive/50 bg-card p-6">
            <h3 className="mb-4 text-lg font-semibold text-foreground">Danger Zone</h3>
            <p className="mb-4 text-sm text-muted-foreground">Logging out will end your current session.</p>
            <Button variant="destructive" onClick={logout}>
              <LogOut className="mr-2 h-4 w-4" />
              Log Out
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
