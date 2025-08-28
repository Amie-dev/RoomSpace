const Footer = () => {
  return (
    <footer className="border-t border-border py-6">
      <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} RoomSpace. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;