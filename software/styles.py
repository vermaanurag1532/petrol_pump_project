from ttkbootstrap.style import Style

class UIStyle:
    @staticmethod
    def configure_styles(style):
        """Configure custom styles for widgets"""
        # Card styles
        style.configure("Card.TFrame",
                       background="#2c3e50",
                       borderwidth=1,
                       relief="solid")
        
        style.configure("CardHeader.TFrame",
                       background="#34495e")
        
        style.configure("CardContent.TFrame",
                       background="#2c3e50")
        
        style.configure("CardTitle.TLabel",
                       background="#34495e",
                       foreground="white",
                       font=("Helvetica", 12, "bold"))
        
        # Button styles
        style.configure("Action.TButton",
                       font=("Helvetica", 10),
                       padding=10)
        
        # Counter styles
        style.configure("Counter.TLabel",
                       font=("Helvetica", 14),
                       foreground="#3498db")
        
        # Status bar style
        style.configure("Status.TLabel",
                       font=("Helvetica", 10),
                           foreground="#95a5a6")