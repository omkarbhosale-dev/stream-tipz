"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
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
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { getStreamer, updateStreamer } from "@/actions/onboarding.acion";
import { getStreamerTransactions } from "@/actions/trasnsaction.action";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  type IStreamer = {
    id: string;
    username: string;
    displayName: string;
    bio?: string;
    upiId?: string;
    // Add other fields as needed based on your backend response
  };
  const [streamerData, setStreamerData] = useState<IStreamer | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [timeFilter, setTimeFilter] = useState<"today" | "30days" | "90days">(
    "30days"
  );
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showEntries, setShowEntries] = useState(5);
  const [streamerDisplayName, setStreamerDisplayName] = useState("");
  const [streamerBio, setStreamerBio] = useState("");
  const [streamerUpiId, setStreamerUpiId] = useState("");
  type Transaction = {
    id: number;
    date: string;
    name: string;
    amount: number;
    message: string;
    createdAt?: string;
    tipperName: string;
    tipperEmail?: string;
  };

  const [transaction, setTransaction] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<
    Transaction[]
  >([]);

  useEffect(() => {
    // Wait until session is loaded and authenticated
    if (status !== "authenticated") return;

    const fetchStreamer = async () => {
      try {
        if (!session?.user?.id) {
          console.error("User ID is undefined.");
          return;
        }

        const data = await getStreamer(session.user.id);
        // Map backend data to IStreamer shape
        const streamer: IStreamer | null = data.data
          ? {
              id: data.data.id ?? data.data._id ?? "",
              username: data.data.username,
              displayName: data.data.displayName,
              bio: data.data.bio,
              upiId: data.data.upiId,
            }
          : null;
        setStreamerData(streamer);
        setStreamerDisplayName(streamer?.displayName ?? "");
        setStreamerBio(streamer?.bio ?? "");
        setStreamerUpiId(streamer?.upiId ?? "");
        // console.log("Fetched Streamer Data:", data);
        const transactionDataGet = await getStreamerTransactions(
          session.user.id
        );
        console.log("Fetched Transactions:", transactionDataGet);

        const mappedTransactions = (transactionDataGet.data ?? []).map(
          (item: any, idx: number) => ({
            id: item.id ?? item._id ?? idx,
            date: item.date ?? item.createdAt ?? "",
            name: item.tipperName ?? item.name ?? "",
            amount: item.amount ?? 0,
            message: item.message ?? "",
            createdAt: item.createdAt ?? item.date ?? "",
            tipperName: item.tipperName ?? item.name ?? "",
            tipperEmail: item.tipperEmail ?? "",
          })
        );
        setTransaction(mappedTransactions);
        setFilteredTransactions(mappedTransactions);
        if (data?.success === false) {
          router.push("/on-boarding");
        }
      } catch (err) {
        console.error("Error fetching streamer:", err);
      }
    };

    fetchStreamer();
  }, [status, session]);

  // Calculate earnings based on time filter

  const handleSaveSettings = async () => {
    const res = await fetch("/api/streamer/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        displayName: streamerDisplayName,
        bio: streamerBio,
        upiId: streamerUpiId,
      }),
    });

    const result = await res.json();
    console.log(result);
  };

  const filterTransactions = () => {
    const filteredTableData = transaction.filter((tip) => {
      const tipDate = new Date(tip.createdAt ?? "");
      return (
        (!startDate || tipDate >= startDate) && (!endDate || tipDate <= endDate)
      );
    });

    const paginatedTableData = filteredTableData.slice(0, showEntries);

    setFilteredTransactions(paginatedTableData);
  };

  const summaryFilteredData = filteredTransactions.filter((tip) => {
    const tipDate = new Date(tip.createdAt ?? "");
    const now = new Date();

    if (timeFilter === "today") {
      return tipDate.toDateString() === now.toDateString();
    } else if (timeFilter === "30days") {
      const past30 = new Date(now.setDate(now.getDate() - 30));
      return tipDate >= past30;
    } else if (timeFilter === "90days") {
      const past90 = new Date(now.setDate(now.getDate() - 90));
      return tipDate >= past90;
    }
    return true;
  });

  // Summary Calculations
  const totalEarnings = summaryFilteredData.reduce(
    (sum, item) => sum + item.amount,
    0
  );
  const totalTransactions = summaryFilteredData.length;
  const averageTransaction =
    totalTransactions === 0 ? 0 : totalEarnings / totalTransactions;
  const highestAmount = summaryFilteredData.reduce(
    (max, item) => Math.max(max, item.amount),
    0
  );

  const downloadPDF = async (data: any[], startDate?: Date, endDate?: Date) => {
    const doc = new jsPDF();

    // Fallback to last 30 days
    const start = startDate ?? new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const end = endDate ?? new Date();

    const startStr = start.toLocaleDateString("en-GB");
    const endStr = end.toLocaleDateString("en-GB");

    // Filter data by date range
    const filtered = data.filter((item) => {
      const date = new Date(item.createdAt);
      return date >= start && date <= end;
    });

    // Optional logo
    // const logo = await fetch("/logo.png").then(res => res.blob()).then(...);

    // doc.addImage(logo, "PNG", 15, 10, 30, 30); // Uncomment when using logo

    // Header
    doc.setFontSize(18);
    doc.text("Tip Transaction Report", 105, 25, { align: "center" });

    doc.setFontSize(12);
    doc.text(
      `Generated on: ${new Date().toLocaleDateString("en-GB")}`,
      105,
      33,
      { align: "center" }
    );
    doc.text(`Date Range: ${startStr} - ${endStr}`, 105, 41, {
      align: "center",
    });

    // Table
    autoTable(doc, {
      startY: 50,
      head: [["#", "Tipper Name", "Email", "Amount", "Date"]],
      body: filtered.map((item, i) => [
        i + 1,
        item.tipperName,
        item.tipperEmail,
        `INR ${item.amount}`, // use Rs. or INR
        new Date(item.createdAt).toLocaleDateString("en-GB"),
      ]),
      didDrawPage: (data) => {
        // Optional: add logo again per page
        // doc.addImage(logo, "PNG", 15, 10, 30, 30);
        doc.setFontSize(10);
        doc.text(
          `Page ${data.pageNumber} of ${doc.getNumberOfPages()}`,
          200,
          290,
          { align: "right" }
        );
      },
    });

    doc.save("tip-transactions.pdf");
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
              <Select
                value={timeFilter}
                onValueChange={(value) =>
                  setTimeFilter(value as "today" | "30days" | "90days")
                }
              >
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
                  <p className="h-6 w-6 text-green-600">₹</p>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    ₹{totalEarnings.toFixed(2)}
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
                    {totalTransactions}
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
                    ₹{averageTransaction.toFixed(2)}
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
                    ₹{highestAmount.toFixed(2)}
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
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      downloadPDF(
                        filteredTransactions,
                        startDate ?? undefined,
                        endDate ?? undefined
                      )
                    }
                  >
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
                      value={
                        startDate ? startDate.toISOString().split("T")[0] : ""
                      }
                      onChange={(e) =>
                        setStartDate(
                          e.target.value ? new Date(e.target.value) : null
                        )
                      }
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
                      value={endDate ? endDate.toISOString().split("T")[0] : ""}
                      onChange={(e) =>
                        setEndDate(
                          e.target.value ? new Date(e.target.value) : null
                        )
                      }
                      className="w-40"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="show-entries" className="text-sm">
                      Show:
                    </Label>
                    <Select
                      value={showEntries.toString()}
                      onValueChange={(value) => setShowEntries(Number(value))}
                    >
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
                            {new Date(
                              transaction.createdAt ?? ""
                            ).toLocaleDateString("en-GB")}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Avatar className="w-6 h-6">
                                <AvatarFallback className="text-xs bg-purple-100 text-purple-700">
                                  {transaction.tipperName
                                    .charAt(0)
                                    .toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <span>{transaction.tipperName}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="secondary"
                              className="bg-green-100 text-green-700"
                            >
                              ₹{transaction.amount.toFixed(2)}
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
          <div className="max-w-2xl mx-auto space-y-8">
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
                    value={streamerDisplayName}
                    onChange={(e) => setStreamerDisplayName(e.target.value)}
                    placeholder="Enter your display name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={streamerBio}
                    onChange={(e) => setStreamerBio(e.target.value)}
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
                    value={streamerUpiId}
                    onChange={(e) => setStreamerUpiId(e.target.value)}
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
                    value={`https://streamtipz.in/tip/${streamerData?.username.toLowerCase()}`}
                    readOnly
                    className="flex-1"
                  />
                  <Button
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `https://streamtipz.in/tip/${streamerData?.username.toLowerCase()}`
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
