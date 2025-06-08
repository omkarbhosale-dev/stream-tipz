"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  DollarSign,
  TrendingUp,
  Gift,
  Trophy,
  Settings,
  User,
  CreditCard,
  Filter,
  Download,
  Info,
} from "lucide-react";
import { useState } from "react";
import Navbar from "@/components/Navbar";

const mockTransactions = [
  {
    id: 1,
    date: "2024-01-15",
    name: "GamerPro123",
    amount: 25.0,
    message: "Great stream! Keep it up!",
  },
  {
    id: 2,
    date: "2024-01-15",
    name: "Anonymous",
    amount: 10.0,
    message: "Love your content!",
  },
  {
    id: 3,
    date: "2024-01-14",
    name: "StreamFan",
    amount: 50.0,
    message: "Amazing gameplay today!",
  },
  {
    id: 4,
    date: "2024-01-14",
    name: "TipMaster",
    amount: 15.0,
    message: "Thanks for the entertainment",
  },
  {
    id: 5,
    date: "2024-01-13",
    name: "ViewerOne",
    amount: 30.0,
    message: "You're awesome!",
  },
  { id: 6, date: "2024-01-13", name: "Anonymous", amount: 5.0, message: "" },
  {
    id: 7,
    date: "2024-01-12",
    name: "BigSupporter",
    amount: 100.0,
    message: "Keep up the great work!",
  },
  {
    id: 8,
    date: "2024-01-12",
    name: "RegularViewer",
    amount: 20.0,
    message: "Love the stream!",
  },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [timeFilter, setTimeFilter] = useState("30days");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showEntries, setShowEntries] = useState("10");
  const [filteredTransactions, setFilteredTransactions] =
    useState(mockTransactions);

  // Mock user data
  const [userSettings, setUserSettings] = useState({
    name: "StreamerName",
    bio: "Gaming Streamer & Content Creator",
    upiId: "streamer@upi",
  });

  // Calculate earnings based on time filter
  const getEarningsData = () => {
    const totalEarnings = filteredTransactions.reduce(
      (sum, t) => sum + t.amount,
      0
    );
    const totalTips = filteredTransactions.length;
    const averageTip = totalTips > 0 ? totalEarnings / totalTips : 0;
    const highestTip = Math.max(
      ...filteredTransactions.map((t) => t.amount),
      0
    );

    return { totalEarnings, totalTips, averageTip, highestTip };
  };

  const { totalEarnings, totalTips, averageTip, highestTip } =
    getEarningsData();

  const handleSaveSettings = () => {
    // Handle saving user settings
    console.log("Settings saved:", userSettings);
  };

  const filterTransactions = () => {
    let filtered = mockTransactions;

    if (startDate && endDate) {
      filtered = filtered.filter((t) => {
        const transactionDate = new Date(t.date);
        return (
          transactionDate >= new Date(startDate) &&
          transactionDate <= new Date(endDate)
        );
      });
    }

    setFilteredTransactions(filtered.slice(0, Number.parseInt(showEntries)));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Payout Notice */}
        <Alert className="mb-8 border-blue-200 bg-blue-50">
          <Info className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            Your earnings will be automatically paid out every Tuesday.
          </AlertDescription>
        </Alert>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg w-fit">
          <Button
            variant={activeTab === "overview" ? "default" : "ghost"}
            onClick={() => setActiveTab("overview")}
            className={
              activeTab === "overview"
                ? "bg-white text-black hover:text-white shadow-sm"
                : ""
            }
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            Overview
          </Button>
          <Button
            variant={activeTab === "settings" ? "default" : "ghost"}
            onClick={() => setActiveTab("settings")}
            className={
              activeTab === "settings"
                ? "bg-white text-black hover:text-white shadow-sm"
                : ""
            }
          >
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>

        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Time Filter */}
            <div className="flex items-center space-x-4">
              <Label htmlFor="time-filter" className="font-medium">
                Time Period:
              </Label>
              <Select value={timeFilter} onValueChange={setTimeFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="30days">Last 30 Days</SelectItem>
                  <SelectItem value="90days">Last 90 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Earnings Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-2 hover:border-green-200 transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Earnings
                  </CardTitle>
                  <DollarSign className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    ${totalEarnings.toFixed(2)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +12% from last period
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-blue-200 transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Tips
                  </CardTitle>
                  <Gift className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">
                    {totalTips}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +8% from last period
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-purple-200 transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Average Tip
                  </CardTitle>
                  <TrendingUp className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-600">
                    ${averageTip.toFixed(2)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +5% from last period
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-orange-200 transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Highest Tip
                  </CardTitle>
                  <Trophy className="h-4 w-4 text-orange-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600">
                    ${highestTip.toFixed(2)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Personal best!
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Transactions */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Recent Transactions</CardTitle>
                    <CardDescription>
                      Your latest tip transactions
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Statement
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {/* Filters */}
                <div className="flex flex-wrap items-center gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="start-date" className="text-sm">
                      Start Date:
                    </Label>
                    <Input
                      id="start-date"
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-40"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="end-date" className="text-sm">
                      End Date:
                    </Label>
                    <Input
                      id="end-date"
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-40"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="show-entries" className="text-sm">
                      Show:
                    </Label>
                    <Select value={showEntries} onValueChange={setShowEntries}>
                      <SelectTrigger className="w-20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5</SelectItem>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="25">25</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={filterTransactions} size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Apply Filters
                  </Button>
                </div>

                {/* Table */}
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Message</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTransactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell className="font-medium">
                            {new Date(transaction.date).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Avatar className="w-6 h-6">
                                <AvatarFallback className="text-xs bg-purple-100 text-purple-700">
                                  {transaction.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <span>{transaction.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="secondary"
                              className="bg-green-100 text-green-700"
                            >
                              ${transaction.amount.toFixed(2)}
                            </Badge>
                          </TableCell>
                          <TableCell className="max-w-xs truncate">
                            {transaction.message || "No message"}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="max-w-2xl space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>Account Settings</span>
                </CardTitle>
                <CardDescription>
                  Update your profile information and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Display Name</Label>
                  <Input
                    id="name"
                    value={userSettings.name}
                    onChange={(e) =>
                      setUserSettings({ ...userSettings, name: e.target.value })
                    }
                    placeholder="Enter your display name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={userSettings.bio}
                    onChange={(e) =>
                      setUserSettings({ ...userSettings, bio: e.target.value })
                    }
                    placeholder="Tell your audience about yourself"
                    className="min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="upi-id"
                    className="flex items-center space-x-2"
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>UPI ID</span>
                  </Label>
                  <Input
                    id="upi-id"
                    value={userSettings.upiId}
                    onChange={(e) =>
                      setUserSettings({
                        ...userSettings,
                        upiId: e.target.value,
                      })
                    }
                    placeholder="your-upi@bank"
                  />
                  <p className="text-sm text-gray-500">
                    This UPI ID will be used for automatic payouts every Tuesday
                  </p>
                </div>

                <Button onClick={handleSaveSettings} className="w-full">
                  Save Changes
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tip Page Link</CardTitle>
                <CardDescription>
                  Share this link with your audience
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <Input
                    value={`https://streamtipz.com/tip/${userSettings.name.toLowerCase()}`}
                    readOnly
                    className="flex-1"
                  />
                  <Button
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `https://streamtipz.com/tip/${userSettings.name.toLowerCase()}`
                      );
                    }}
                  >
                    Copy
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
