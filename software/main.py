# main.py
import tkinter as tk
from tkinter import ttk  
from main_window import VehicleTrackingUI
from config import Config

def main():
    """Initialize and run the application"""
    root = tk.Tk()
    # Set minimum window size
    root.minsize(Config.MIN_WINDOW_WIDTH, Config.MIN_WINDOW_HEIGHT)
    
    # Configure style
    style = ttk.Style()  # Now this will work
    style.configure('TButton', padding=5)
    style.configure('TFrame', padding=5)
    style.configure('TLabel', padding=2)
    style.configure('TLabelframe', padding=10)
    
    # Create and run application
    app = VehicleTrackingUI(root)
    
    # Center window on screen
    screen_width = root.winfo_screenwidth()
    screen_height = root.winfo_screenheight()
    center_x = int(screen_width/2 - Config.WINDOW_WIDTH/2)
    center_y = int(screen_height/2 - Config.WINDOW_HEIGHT/2)
    root.geometry(f'{Config.WINDOW_WIDTH}x{Config.WINDOW_HEIGHT}+{center_x}+{center_y}')
    
    # Start mainloop
    root.mainloop()

if __name__ == "__main__":
    main()