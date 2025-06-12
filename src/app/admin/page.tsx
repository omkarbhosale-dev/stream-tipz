"use client";

import type React from "react";

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
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Shield,
  TrendingUp,
  Upload,
  FileText,
  Calendar,
  Search,
  Download,
  DollarSign,
  CreditCard,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import { useState, useRef } from "react";
import Link from "next/link";
import Header from "@/components/Header";

// Mock data for transactions
const mockTransactions = [
  {
    id: "TXN001",
    streamerId: "streamer123",
    streamerName: "GamerPro123",
    date: "2024-01-15",
    amount: 25.0,
    status: "completed",
    tipperName: "Anonymous",
    message: "Great stream!",
  },
  {
    id: "TXN002",
    streamerId: "streamer456",
    streamerName: "StreamQueen",
    date: "2024-01-14",
    amount: 50.0,
    status: "completed",
    tipperName: "BigFan",
    message: "Love your content!",
  },
  {
    id: "TXN003",
    streamerId: "streamer789",
    streamerName: "TechMaster",
    date: "2024-01-13",
    amount: 15.0,
    status: "pending",
    tipperName: "TechLover",
    message: "Amazing tutorial!",
  },
  {
    id: "TXN004",
    streamerId: "streamer123",
    streamerName: "GamerPro123",
    date: "2024-01-12",
    amount: 30.0,
    status: "failed",
    tipperName: "GameFan",
    message: "Keep it up!",
  },
];

// Mock data for Excel channels
const mockExcelChannels = [
  { id: "channel1", name: "GamerPro123" },
  { id: "channel2", name: "StreamQueen" },
  { id: "channel3", name: "TechMaster" },
  { id: "channel4", name: "MusicVibes" },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [overviewSubTab, setOverviewSubTab] = useState("manual");

  // Manual Entry State
  const [streamerId, setStreamerId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [manualTransactions, setManualTransactions] = useState<
    typeof mockTransactions
  >([]);

  // Excel Upload State
  const [excelFile, setExcelFile] = useState<File | null>(null);
  const [selectedChannel, setSelectedChannel] = useState("");
  const [excelStartDate, setExcelStartDate] = useState("");
  const [excelEndDate, setExcelEndDate] = useState("");
  const [excelTransactions, setExcelTransactions] = useState<
    typeof mockTransactions
  >([]);
  const [availableChannels, setAvailableChannels] = useState(mockExcelChannels);

  // Payout State
  const [payoutFile, setPayoutFile] = useState<File | null>(null);
  const [payoutTransactions, setPayoutTransactions] = useState<
    typeof mockTransactions
  >([]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const payoutFileInputRef = useRef<HTMLInputElement>(null);

  // Manual Entry Functions
  const handleQuickDateRange = (days: number) => {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - days);

    setStartDate(startDate.toISOString().split("T")[0]);
    setEndDate(endDate.toISOString().split("T")[0]);
  };

  const handleGetTransactions = () => {
    // Filter mock data based on streamerId and date range
    const filtered = mockTransactions.filter((transaction) => {
      const matchesStreamer =
        !streamerId || transaction.streamerId.includes(streamerId);
      const transactionDate = new Date(transaction.date);
      const start = startDate ? new Date(startDate) : new Date("2000-01-01");
      const end = endDate ? new Date(endDate) : new Date();

      return (
        matchesStreamer && transactionDate >= start && transactionDate <= end
      );
    });

    setManualTransactions(filtered);
  };

  // Excel Upload Functions
  const handleExcelUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setExcelFile(file);
      // Simulate parsing Excel file and extracting channels
      setAvailableChannels(mockExcelChannels);
    }
  };

  const handleExcelQuickDateRange = (days: number) => {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - days);

    setExcelStartDate(startDate.toISOString().split("T")[0]);
    setExcelEndDate(endDate.toISOString().split("T")[0]);
  };

  const handleExcelGetTransactions = () => {
    if (!selectedChannel) return;

    // Filter mock data based on selected channel and date range
    const filtered = mockTransactions.filter((transaction) => {
      const matchesChannel = transaction.streamerId === selectedChannel;
      const transactionDate = new Date(transaction.date);
      const start = excelStartDate
        ? new Date(excelStartDate)
        : new Date("2000-01-01");
      const end = excelEndDate ? new Date(excelEndDate) : new Date();

      return (
        matchesChannel && transactionDate >= start && transactionDate <= end
      );
    });

    setExcelTransactions(filtered);
  };

  // Payout Functions
  const handlePayoutUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPayoutFile(file);
      // Simulate processing payout file and filtering successful transactions
      const successfulTransactions = mockTransactions.filter(
        (t) => t.status === "completed"
      );
      setPayoutTransactions(successfulTransactions);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-green-100 text-green-700">
            <CheckCircle className="w-3 h-3 mr-1" />
            Completed
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-700">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
      case "failed":
        return (
          <Badge className="bg-red-100 text-red-700">
            <XCircle className="w-3 h-3 mr-1" />
            Failed
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const TransactionTable = ({
    transactions,
  }: {
    transactions: typeof mockTransactions;
  }) => (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Transaction ID</TableHead>
            <TableHead>Streamer</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Tipper</TableHead>
            <TableHead>Message</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell className="font-medium">{transaction.id}</TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Avatar className="w-6 h-6">
                    <AvatarFallback className="text-xs bg-purple-100 text-purple-700">
                      {transaction.streamerName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span>{transaction.streamerName}</span>
                </div>
              </TableCell>
              <TableCell>
                {new Date(transaction.date).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <span className="font-medium text-green-600">
                  ${transaction.amount.toFixed(2)}
                </span>
              </TableCell>
              <TableCell>{getStatusBadge(transaction.status)}</TableCell>
              <TableCell>{transaction.tipperName}</TableCell>
              <TableCell className="max-w-xs truncate">
                {transaction.message}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Admin Alert */}
        <Alert className="mb-8 border-red-200 bg-red-50">
          <Shield className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            You are logged in as an administrator. All actions are logged and
            monitored.
          </AlertDescription>
        </Alert>

        {/* Navigation Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-8"
        >
          <TabsList className="grid w-full grid-cols-2 lg:w-fit">
            <TabsTrigger
              value="overview"
              className="flex items-center space-x-2"
            >
              <TrendingUp className="w-4 h-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger
              value="payouts"
              className="flex items-center space-x-2"
            >
              <CreditCard className="w-4 h-4" />
              <span>Payouts</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Transaction Overview
                </h1>
                <p className="text-gray-600">
                  Manage and view transaction data
                </p>
              </div>
            </div>

            {/* Overview Sub-tabs */}
            <Tabs value={overviewSubTab} onValueChange={setOverviewSubTab}>
              <TabsList className="grid w-full grid-cols-2 lg:w-fit">
                <TabsTrigger
                  value="manual"
                  className="flex items-center space-x-2"
                >
                  <Search className="w-4 h-4" />
                  <span>Manual Entry</span>
                </TabsTrigger>
                <TabsTrigger
                  value="excel"
                  className="flex items-center space-x-2"
                >
                  <Upload className="w-4 h-4" />
                  <span>Excel Upload</span>
                </TabsTrigger>
              </TabsList>

              {/* Manual Entry */}
              <TabsContent value="manual" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Search className="w-5 h-5" />
                      <span>Manual Transaction Search</span>
                    </CardTitle>
                    <CardDescription>
                      Search for transactions by streamer ID and date range
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="streamer-id">Streamer ID</Label>
                        <Input
                          id="streamer-id"
                          placeholder="Enter streamer ID"
                          value={streamerId}
                          onChange={(e) => setStreamerId(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="start-date">Start Date</Label>
                        <Input
                          id="start-date"
                          type="date"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="end-date">End Date</Label>
                        <Input
                          id="end-date"
                          type="date"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <Button
                        variant="outline"
                        onClick={() => handleQuickDateRange(7)}
                        className="flex items-center space-x-2"
                      >
                        <Calendar className="w-4 h-4" />
                        <span>Last 7 Days</span>
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleQuickDateRange(30)}
                        className="flex items-center space-x-2"
                      >
                        <Calendar className="w-4 h-4" />
                        <span>Last 30 Days</span>
                      </Button>
                      <Button
                        onClick={handleGetTransactions}
                        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                      >
                        <Search className="w-4 h-4 mr-2" />
                        Get Transactions
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {manualTransactions.length > 0 && (
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>Transaction Results</CardTitle>
                          <CardDescription>
                            Found {manualTransactions.length} transactions
                          </CardDescription>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Export
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <TransactionTable transactions={manualTransactions} />
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              {/* Excel Upload */}
              <TabsContent value="excel" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Upload className="w-5 h-5" />
                      <span>Excel File Upload</span>
                    </CardTitle>
                    <CardDescription>
                      Upload an Excel file and select a channel to view
                      transactions
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="excel-upload">Upload Excel File</Label>
                        <div className="flex items-center space-x-4">
                          <Input
                            id="excel-upload"
                            type="file"
                            accept=".xlsx,.xls,.csv"
                            onChange={handleExcelUpload}
                            ref={fileInputRef}
                            className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                          />
                          {excelFile && (
                            <Badge className="bg-green-100 text-green-700">
                              <FileText className="w-3 h-3 mr-1" />
                              {excelFile.name}
                            </Badge>
                          )}
                        </div>
                      </div>

                      {excelFile && (
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="channel-select">
                              Select Channel
                            </Label>
                            <Select
                              value={selectedChannel}
                              onValueChange={setSelectedChannel}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Choose channel" />
                              </SelectTrigger>
                              <SelectContent>
                                {availableChannels.map((channel) => (
                                  <SelectItem
                                    key={channel.id}
                                    value={channel.id}
                                  >
                                    {channel.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="excel-start-date">Start Date</Label>
                            <Input
                              id="excel-start-date"
                              type="date"
                              value={excelStartDate}
                              onChange={(e) =>
                                setExcelStartDate(e.target.value)
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="excel-end-date">End Date</Label>
                            <Input
                              id="excel-end-date"
                              type="date"
                              value={excelEndDate}
                              onChange={(e) => setExcelEndDate(e.target.value)}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {excelFile && (
                      <div className="flex flex-wrap gap-3">
                        <Button
                          variant="outline"
                          onClick={() => handleExcelQuickDateRange(7)}
                          className="flex items-center space-x-2"
                        >
                          <Calendar className="w-4 h-4" />
                          <span>Last 7 Days</span>
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => handleExcelQuickDateRange(30)}
                          className="flex items-center space-x-2"
                        >
                          <Calendar className="w-4 h-4" />
                          <span>Last 30 Days</span>
                        </Button>
                        <Button
                          onClick={handleExcelGetTransactions}
                          disabled={!selectedChannel}
                          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                        >
                          <Search className="w-4 h-4 mr-2" />
                          Get Transactions
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {excelTransactions.length > 0 && (
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>Excel Transaction Results</CardTitle>
                          <CardDescription>
                            Found {excelTransactions.length} transactions for
                            selected channel
                          </CardDescription>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Export
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <TransactionTable transactions={excelTransactions} />
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </TabsContent>

          {/* Payouts Tab */}
          <TabsContent value="payouts" className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Payout Management
                </h1>
                <p className="text-gray-600">
                  Process and manage streamer payouts
                </p>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="w-5 h-5" />
                  <span>Payout Processing</span>
                </CardTitle>
                <CardDescription>
                  Upload Excel file to filter and process successful
                  transactions for payouts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="payout-upload">
                    Upload Payout Excel File
                  </Label>
                  <div className="flex items-center space-x-4">
                    <Input
                      id="payout-upload"
                      type="file"
                      accept=".xlsx,.xls,.csv"
                      onChange={handlePayoutUpload}
                      ref={payoutFileInputRef}
                      className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                    />
                    {payoutFile && (
                      <Badge className="bg-green-100 text-green-700">
                        <FileText className="w-3 h-3 mr-1" />
                        {payoutFile.name}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">
                    Upload an Excel file containing transaction data. The system
                    will automatically filter successful transactions.
                  </p>
                </div>
              </CardContent>
            </Card>

            {payoutTransactions.length > 0 && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Successful Transactions for Payout</CardTitle>
                      <CardDescription>
                        {payoutTransactions.length} successful transactions
                        ready for payout
                        <span className="ml-2 font-medium text-green-600">
                          Total: $
                          {payoutTransactions
                            .reduce((sum, t) => sum + t.amount, 0)
                            .toFixed(2)}
                        </span>
                      </CardDescription>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Export Payout Report
                      </Button>
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <DollarSign className="w-4 h-4 mr-2" />
                        Process Payouts
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <TransactionTable transactions={payoutTransactions} />
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
