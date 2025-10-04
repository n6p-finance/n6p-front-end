"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { useWallet } from "@/hooks/use-wallet"
import { Settings, User, Bell, Palette, Shield, Wallet, Music } from "lucide-react"

export default function SettingsPage() {
  const { isConnected, address } = useWallet()
  const [notifications, setNotifications] = useState({
    newReleases: true,
    poolUpdates: true,
    rewards: true,
    messages: false,
  })
  const [audioQuality, setAudioQuality] = useState("high")
  const [theme, setTheme] = useState("dark")
  const [autoPlay, setAutoPlay] = useState(true)
  const [crossfade, setCrossfade] = useState([3])

  return (
    <div className="space-y-8 p-8">
      {/* Header */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <Settings className="h-8 w-8 text-purple-500" />
          <h1 className="text-4xl font-bold text-white">Settings</h1>
        </div>
        <p className="text-gray-400">Manage your account and preferences</p>
      </section>

      {/* Settings Tabs */}
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="bg-white/5">
          <TabsTrigger value="profile" className="data-[state=active]:bg-purple-500/20">
            <User className="mr-2 h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-purple-500/20">
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="playback" className="data-[state=active]:bg-purple-500/20">
            <Music className="mr-2 h-4 w-4" />
            Playback
          </TabsTrigger>
          <TabsTrigger value="appearance" className="data-[state=active]:bg-purple-500/20">
            <Palette className="mr-2 h-4 w-4" />
            Appearance
          </TabsTrigger>
          <TabsTrigger value="wallet" className="data-[state=active]:bg-purple-500/20">
            <Wallet className="mr-2 h-4 w-4" />
            Wallet
          </TabsTrigger>
          <TabsTrigger value="privacy" className="data-[state=active]:bg-purple-500/20">
            <Shield className="mr-2 h-4 w-4" />
            Privacy
          </TabsTrigger>
        </TabsList>

        {/* Profile Settings */}
        <TabsContent value="profile" className="space-y-6 pt-6">
          <Card className="glass border-white/10 p-6">
            <h3 className="mb-6 text-xl font-semibold text-white">Profile Information</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-gray-400">
                  Username
                </Label>
                <Input
                  id="username"
                  placeholder="Enter username"
                  defaultValue="musiclover"
                  className="border-white/10 bg-white/5 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-400">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter email"
                  defaultValue="user@example.com"
                  className="border-white/10 bg-white/5 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio" className="text-gray-400">
                  Bio
                </Label>
                <textarea
                  id="bio"
                  placeholder="Tell us about yourself"
                  rows={4}
                  className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-gray-500"
                  defaultValue="Music enthusiast and DeFi explorer"
                />
              </div>
              <Button className="gradient-purple-blue border-0 text-white hover:opacity-90">Save Changes</Button>
            </div>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-6 pt-6">
          <Card className="glass border-white/10 p-6">
            <h3 className="mb-6 text-xl font-semibold text-white">Notification Preferences</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-white">New Releases</p>
                  <p className="text-sm text-gray-400">Get notified when artists you follow release new music</p>
                </div>
                <Switch
                  checked={notifications.newReleases}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, newReleases: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-white">Pool Updates</p>
                  <p className="text-sm text-gray-400">Updates about liquidity pools you're staking in</p>
                </div>
                <Switch
                  checked={notifications.poolUpdates}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, poolUpdates: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-white">Rewards</p>
                  <p className="text-sm text-gray-400">Notifications about earned rewards and airdrops</p>
                </div>
                <Switch
                  checked={notifications.rewards}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, rewards: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-white">Messages</p>
                  <p className="text-sm text-gray-400">Direct messages from other users</p>
                </div>
                <Switch
                  checked={notifications.messages}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, messages: checked })}
                />
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Playback Settings */}
        <TabsContent value="playback" className="space-y-6 pt-6">
          <Card className="glass border-white/10 p-6">
            <h3 className="mb-6 text-xl font-semibold text-white">Playback Settings</h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label className="text-gray-400">Audio Quality</Label>
                <Select value={audioQuality} onValueChange={setAudioQuality}>
                  <SelectTrigger className="border-white/10 bg-white/5 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="border-white/10 bg-black/90 backdrop-blur-xl">
                    <SelectItem value="low">Low (96 kbps)</SelectItem>
                    <SelectItem value="normal">Normal (160 kbps)</SelectItem>
                    <SelectItem value="high">High (320 kbps)</SelectItem>
                    <SelectItem value="lossless">Lossless (FLAC)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-white">Autoplay</p>
                  <p className="text-sm text-gray-400">Automatically play similar tracks when your music ends</p>
                </div>
                <Switch checked={autoPlay} onCheckedChange={setAutoPlay} />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-gray-400">Crossfade</Label>
                  <span className="text-sm text-white">{crossfade[0]}s</span>
                </div>
                <Slider value={crossfade} onValueChange={setCrossfade} max={12} step={1} />
                <p className="text-xs text-gray-500">Smooth transition between tracks</p>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance" className="space-y-6 pt-6">
          <Card className="glass border-white/10 p-6">
            <h3 className="mb-6 text-xl font-semibold text-white">Appearance</h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label className="text-gray-400">Theme</Label>
                <Select value={theme} onValueChange={setTheme}>
                  <SelectTrigger className="border-white/10 bg-white/5 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="border-white/10 bg-black/90 backdrop-blur-xl">
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="auto">Auto</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label className="text-gray-400">Accent Color</Label>
                <div className="grid grid-cols-6 gap-3">
                  {["purple", "blue", "green", "orange", "pink", "cyan"].map((color) => (
                    <button
                      key={color}
                      className={`h-12 w-12 rounded-lg bg-gradient-to-br from-${color}-500 to-${color}-600 hover:scale-110 transition-transform`}
                      aria-label={`${color} theme`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Wallet Settings */}
        <TabsContent value="wallet" className="space-y-6 pt-6">
          <Card className="glass border-white/10 p-6">
            <h3 className="mb-6 text-xl font-semibold text-white">Wallet Settings</h3>
            {isConnected ? (
              <div className="space-y-4">
                <div className="glass rounded-lg p-4">
                  <p className="mb-2 text-sm text-gray-400">Connected Wallet</p>
                  <p className="font-mono text-white">{address}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-400">Default Network</Label>
                  <Select defaultValue="ethereum">
                    <SelectTrigger className="border-white/10 bg-white/5 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="border-white/10 bg-black/90 backdrop-blur-xl">
                      <SelectItem value="ethereum">Ethereum Mainnet</SelectItem>
                      <SelectItem value="polygon">Polygon</SelectItem>
                      <SelectItem value="arbitrum">Arbitrum</SelectItem>
                      <SelectItem value="optimism">Optimism</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-white">Auto-approve transactions</p>
                    <p className="text-sm text-gray-400">Skip confirmation for small transactions</p>
                  </div>
                  <Switch />
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="mb-4 text-gray-400">No wallet connected</p>
                <Button className="gradient-purple-blue border-0 text-white hover:opacity-90">Connect Wallet</Button>
              </div>
            )}
          </Card>
        </TabsContent>

        {/* Privacy Settings */}
        <TabsContent value="privacy" className="space-y-6 pt-6">
          <Card className="glass border-white/10 p-6">
            <h3 className="mb-6 text-xl font-semibold text-white">Privacy & Security</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-white">Private Profile</p>
                  <p className="text-sm text-gray-400">Hide your profile from other users</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-white">Show Listening Activity</p>
                  <p className="text-sm text-gray-400">Let others see what you're listening to</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-white">Show Wallet Holdings</p>
                  <p className="text-sm text-gray-400">Display your token holdings on your profile</p>
                </div>
                <Switch />
              </div>
              <div className="pt-4 border-t border-white/10">
                <Button variant="outline" className="border-red-500/50 bg-red-500/10 text-red-400 hover:bg-red-500/20">
                  Delete Account
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
