#!/usr/bin/env python3
"""Extract a frame from video to create a background image"""

import cv2
from pathlib import Path

base_dir = Path(__file__).parent
video_path = base_dir / "matrixa.mp4"
output_path = base_dir / "card-bg.jpg"

print(f"🎬 Extracting frame from video...")

try:
    # Open video
    cap = cv2.VideoCapture(str(video_path))
    
    # Read middle frame for best visual
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    frame_index = total_frames // 2
    
    cap.set(cv2.CAP_PROP_POS_FRAMES, frame_index)
    ret, frame = cap.read()
    
    if ret:
        # Resize to reduce file size
        frame_resized = cv2.resize(frame, (640, 790))
        
        # Save as JPEG
        cv2.imwrite(str(output_path), frame_resized, [cv2.IMWRITE_JPEG_QUALITY, 85])
        
        file_size = output_path.stat().st_size / 1024
        print(f"✅ Frame extracted successfully!")
        print(f"Output: {output_path}")
        print(f"File size: {file_size:.1f} KB")
    else:
        print(f"❌ Failed to read frame")
        
    cap.release()
    
except Exception as e:
    print(f"❌ Error: {e}")
    import traceback
    traceback.print_exc()
