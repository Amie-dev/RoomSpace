import { Share2, Plus, Users, FolderSync } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/app");
  };

  return (
    <>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center justify-center py-12 text-center max-w-2xl mx-auto">
          <div className="bg-primary/10 rounded-full p-5 mb-6 flex items-center justify-center">
            <img
              src="/roomspace.svg"
              alt="RoomSpace Logo"
              className="h-12 w-12"
            />
          </div>

          <h1 className="text-3xl font-bold mb-4">Welcome to RoomSpace</h1>
          <p className="text-muted-foreground text-lg mb-8">
            Create collaborative rooms to share files and communicate with your
            team in real-time.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 w-full">
            <div className="bg-muted rounded-lg p-6">
              <div className="bg-primary/10 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4 mx-auto">
                <Plus className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Create Rooms</h3>
              <p className="text-sm text-muted-foreground">
                Set up dedicated spaces for different projects or teams.
              </p>
            </div>

            <div className="bg-muted rounded-lg p-6">
              <div className="bg-primary/10 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4 mx-auto">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Invite Others</h3>
              <p className="text-sm text-muted-foreground">
                Share room links with colleagues to collaborate.
              </p>
            </div>

            <div className="bg-muted rounded-lg p-6">
              <div className="bg-primary/10 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4 mx-auto">
                <FolderSync className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Share Files</h3>
              <p className="text-sm text-muted-foreground">
                Upload and access files from anywhere with your team.
              </p>
            </div>
          </div>

          <Button
            size="lg"
            className="flex items-center gap-2 px-8 py-6 text-lg"
            onClick={handleGetStarted}
          >
            <Plus className="h-5 w-5" />
            Get Started
          </Button>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
