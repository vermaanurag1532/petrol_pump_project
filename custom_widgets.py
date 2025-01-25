import tkinter as tk
from tkinter import ttk
import ttkbootstrap as ttk
from ttkbootstrap.constants import *

class ModernCard(ttk.Frame):
    """Custom card widget with hover effects and gradients"""
    def __init__(self, parent, title, **kwargs):
        super().__init__(parent, **kwargs)
        
        # Create gradient background
        self.configure(style="Card.TFrame")
        
        # Header
        header = ttk.Frame(self, style="CardHeader.TFrame")
        header.pack(fill="x", padx=2, pady=2)
        
        ttk.Label(header, text=title, style="CardTitle.TLabel").pack(pady=5)
        
        # Content frame
        self.content = ttk.Frame(self, style="CardContent.TFrame")
        self.content.pack(fill="both", expand=True, padx=2, pady=(0, 2))

class AnimatedButton(ttk.Button):
    """Custom button with hover animation"""
    def __init__(self, parent, **kwargs):
        super().__init__(parent, **kwargs)
        self.bind("<Enter>", self._on_enter)
        self.bind("<Leave>", self._on_leave)
        
    def _on_enter(self, e):
        self.state(["pressed"])
        
    def _on_leave(self, e):
        self.state(["!pressed"])