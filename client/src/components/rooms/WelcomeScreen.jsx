const WelcomeScreen = () => (
  <div className="flex-1 flex items-center justify-center">
    <div className="text-center text-muted-foreground max-w-md">
      <div className="bg-primary/10 rounded-full p-6 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
        <img
          src="/roomspace.svg"
          alt="RoomSpace Logo"
          className="h-8 w-8"
        />
      </div>
      <h2 className="text-2xl font-bold mb-4">Welcome to RoomSpace</h2>
      <p className="text-muted-foreground">
        Select a room from the sidebar to start chatting.
      </p>
    </div>
  </div>
);

export default WelcomeScreen;