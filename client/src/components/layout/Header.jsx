import { Moon, Sun, Share2 } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/common/theme"

const Header = () => {
    const { theme, setTheme } = useTheme()

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark")
    }

    return (
        <header className="flex items-center justify-between p-4 border-b border-border">
            <Link to="/" className="text-2xl font-bold flex items-center gap-2">
                <div className="bg-primary rounded-md p-1">
                    <Share2 className="h-4 w-4 text-primary-foreground" />
                </div>
                <span>RoomSpace</span>
            </Link>
            <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon" onClick={toggleTheme}>
                    {theme === "dark" ? (
                        <Sun className="h-5 w-5" />
                    ) : (
                        <Moon className="h-5 w-5" />
                    )}
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </div>
        </header>
    )
}

export default Header