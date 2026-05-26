import os
import random
import shutil

def merge_into_fake(brand_path, target=200, min_synth=50):
    fake_path = os.path.join(brand_path, "fake")
    clone_path = os.path.join(brand_path, "clone")

    if not os.path.exists(clone_path):
        print(f"{brand_path}: No clone folder, skipping")
        return

    # Backup synthetic before deletion (IMPORTANT)
    backup_path = os.path.join(brand_path, "fake_backup")
    if not os.path.exists(backup_path):
        os.makedirs(backup_path, exist_ok=True)
        for f in os.listdir(fake_path):
            shutil.copy(os.path.join(fake_path, f), os.path.join(backup_path, f))

    synth_files = os.listdir(backup_path)
    real_files = os.listdir(clone_path)

    print(f"\nProcessing: {brand_path}")
    print(f"Real: {len(real_files)}, Synthetic: {len(synth_files)}")

    max_real_allowed = target - min_synth

    # Step 1: Select real images
    if len(real_files) >= max_real_allowed:
        selected_real = random.sample(real_files, max_real_allowed)
    else:
        selected_real = real_files

    # Step 2: Select synthetic images
    remaining = target - len(selected_real)
    synth_needed = max(remaining, min_synth)

    if len(synth_files) >= synth_needed:
        selected_synth = random.sample(synth_files, synth_needed)
    else:
        selected_synth = synth_files

    # Step 3: Clear fake folder
    for f in os.listdir(fake_path):
        os.remove(os.path.join(fake_path, f))

    # Step 4: Copy real images
    for f in selected_real:
        src = os.path.join(clone_path, f)
        dst = os.path.join(fake_path, f"real_{f}")
        shutil.copy(src, dst)

    # Step 5: Copy synthetic images
    for f in selected_synth:
        src = os.path.join(backup_path, f)
        dst = os.path.join(fake_path, f"synth_{f}")
        shutil.copy(src, dst)

    print(f"Final count: {len(os.listdir(fake_path))}")

DATASET_PATH = "D:/VIT Personal/TrustFilterAI/ml/counterfeit_detection/data/raw"

for brand in os.listdir(DATASET_PATH):
    brand_path = os.path.join(DATASET_PATH, brand)

    if not os.path.isdir(brand_path):
        continue

    merge_into_fake(brand_path)