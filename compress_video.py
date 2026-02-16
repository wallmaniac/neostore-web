#!/usr/bin/env python3
"""Compress matrixa.mp4 to reduce file size"""

import os
from pathlib import Path
import imageio
import cv2

# Define paths
base_dir = Path(__file__).parent
input_video = base_dir / "matrixa.mp4"
output_video = base_dir / "matrixa_compressed.mp4"

print(f"📹 Starting video compression...")
print(f"Input: {input_video}")
original_size = input_video.stat().st_size / (1024*1024)
print(f"Original size: {original_size:.2f} MB")

try:
    # Read video with OpenCV
    cap = cv2.VideoCapture(str(input_video))
    fps = cap.get(cv2.CAP_PROP_FPS)
    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    
    # Reduce resolution to 480p
    new_width = 640
    new_height = int(height * (640 / width))
    
    print(f"Resolution: {width}x{height} -> {new_width}x{new_height}")
    print(f"FPS: {fps}")
    
    # Write compressed video
    writer = imageio.get_writer(str(output_video), fps=fps, codec='libx264', pixelformat='yuv420p', bitrate='400k')
    
    frame_count = 0
    while True:
        ret, frame = cap.read()
        if not ret:
            break
        
        # Resize frame
        frame_resized = cv2.resize(frame, (new_width, new_height))
        # Convert BGR to RGB for imageio
        frame_rgb = cv2.cvtColor(frame_resized, cv2.COLOR_BGR2RGB)
        writer.append_data(frame_rgb)
        
        frame_count += 1
        if frame_count % 30 == 0:
            print(f"  Processing... {frame_count} frames", end='\r')
    
    writer.close()
    cap.release()
    
    output_size = output_video.stat().st_size / (1024*1024)
    reduction = (1 - output_size / original_size) * 100
    print(f"\n✅ Compression complete!       ")
    print(f"Output size: {output_size:.2f} MB")
    print(f"Compression ratio: {reduction:.1f}%")
    
except Exception as e:
    print(f"❌ Error: {e}")
    import traceback
    traceback.print_exc()

