import torch

# Check if CUDA is available
if torch.cuda.is_available():
    device = torch.device("cuda")
    print(f"Using Device: {device}")

    device_no = torch.cuda.current_device()
    print(f"Current device number is: {device_no}")

    device_name = torch.cuda.get_device_name(device_no)
    print(f"GPU name is: {device_name}")
else:
    print("CUDA is not available")

# print("Hello World")
