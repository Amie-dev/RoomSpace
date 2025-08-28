<<<<<<< Updated upstream
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "@/config";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  FileText,
  MessageSquare,
  Calendar,
  User,
  Download,
  LinkIcon,
  Share2,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { handleError, clearErrorToast } from "@/lib/errorHandler";
=======
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { FileText, MessageSquare, Calendar, User, Download, LinkIcon, Share2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { handleError, clearErrorToast } from '@/lib/errorHandler';
import Api from '@/utils/api.js';
>>>>>>> Stashed changes

const RoomDetail = () => {
  const { uniqueId } = useParams();
  const [roomData, setRoomData] = useState([]);
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [uniqueId]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
<<<<<<< Updated upstream
      const response = await axios.get(
        `${API_BASE_URL}/api/v1/data/${uniqueId}/get-data`,
      );
=======
      const response = await Api.get(`/data/${uniqueId}/get-data`);
>>>>>>> Stashed changes
      setRoomData(response.data.data);
      // Clear any previous error toasts when connection is restored
      clearErrorToast();
    } catch (error) {
      console.error("Error fetching room data:", error);
      handleError(error, "fetch room data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddData = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    if (file) {
      formData.append("file", file);
    } else if (content.trim()) {
      formData.append("content", content);
    } else {
      toast.error("Please enter text or select a file.");
      return;
    }

    try {
<<<<<<< Updated upstream
      const response = await axios.post(
        `${API_BASE_URL}/api/v1/data/set-data/${uniqueId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
=======
      const response = await Api.post(`/data/set-data/${uniqueId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
>>>>>>> Stashed changes
        },
      );

      setRoomData([...roomData, response.data.data]);
      setContent("");
      setFile(null);
      setFileName("");

      toast.success("Content added successfully!");
      // Clear any previous error toasts when connection is restored
      clearErrorToast();
    } catch (error) {
      console.error("Error adding data:", error);
      handleError(error, "add content");
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const copyRoomLink = () => {
    const link = `${window.location.origin}/room/${uniqueId}`;
    navigator.clipboard.writeText(link);
    toast.success("Room link copied to clipboard!");
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle className="flex items-center gap-2">
                <Share2 className="h-5 w-5" />
                Room: {uniqueId}
              </CardTitle>
              <Button
                variant="outline"
                onClick={copyRoomLink}
                className="flex items-center gap-2"
              >
                <LinkIcon className="h-4 w-4" />
                Copy Link
              </Button>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Add Content</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddData} className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="text-content">Text</Label>
                    <Textarea
                      id="text-content"
                      placeholder="Enter text to share..."
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      disabled={!!file}
                      className="min-h-[100px] font-mono text-sm rounded-md border-input bg-background shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="file-upload">File</Label>
                    <div className="flex gap-2">
                      <Input
                        id="file-upload"
                        type="file"
                        onChange={handleFileChange}
                        disabled={!!content.trim()}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() =>
                          document.getElementById("file-upload").click()
                        }
                        className="w-full"
                      >
                        {fileName || "Choose File"}
                      </Button>
                    </div>
                  </div>

                  <Button type="submit" className="w-full">
                    Add Content
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Room Content</CardTitle>
                  <span className="text-sm text-muted-foreground">
                    {roomData.length} items
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="border border-border rounded-lg p-4"
                      >
                        <div className="flex items-center gap-3">
                          <Skeleton className="h-8 w-8 rounded-md" />
                          <div className="flex-1">
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-3 w-1/2 mt-2" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : roomData.length === 0 ? (
                  <div className="py-10 text-center">
                    <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      No content in this room yet
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Add text or upload files to get started
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {[...roomData].reverse().map((data, index) => (
                      <div
                        key={data._id || index}
                        className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                      >
                        {data.datatype === "file" ? (
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="bg-primary/10 p-2 rounded-md">
                                <FileText className="h-4 w-4 text-primary" />
                              </div>
                              <div>
                                <a
                                  href={data.content}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="font-medium hover:underline"
                                >
                                  {data.content.split("/").pop()}
                                </a>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                                  <Calendar className="h-3 w-3" />
                                  <span>
                                    {data.createdAt
                                      ? new Date(
                                          data.createdAt,
                                        ).toLocaleDateString()
                                      : "Unknown date"}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <a href={data.content} download>
                              <Button variant="ghost" size="icon">
                                <Download className="h-4 w-4" />
                              </Button>
                            </a>
                          </div>
                        ) : (
                          <div className="flex items-start gap-3">
                            <div className="bg-primary/10 p-2 rounded-md mt-0.5">
                              <MessageSquare className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <p className="text-foreground break-words">
                                {data.content}
                              </p>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
                                <User className="h-3 w-3" />
                                <span>You</span>
                                <span>•</span>
                                <Calendar className="h-3 w-3" />
                                <span>
                                  {data.createdAt
                                    ? new Date(data.createdAt).toLocaleString()
                                    : "Unknown date"}
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetail;
