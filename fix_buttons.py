import glob
import re

def update_buttons(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Pattern to match class attribute containing rounded-lg on an element that is a button or a tag
    # Actually, simpler: just find all rounded-lg inside class attribute and replace with rounded-full
    # ONLY IF the class string also contains a primary button style like 'bg-gold-500', 'bg-charcoal-950', or 'border-gold-500' 
    # to avoid changing container divs, inputs, or tables

    def replacer(match):
        class_str = match.group(1)
        if 'rounded-lg' in class_str:
            if 'bg-gold-500' in class_str or 'bg-charcoal-950' in class_str or 'border-gold-500' in class_str:
                if 'overflow-hidden' not in class_str and 'border-gray-100' not in class_str:
                    class_str = class_str.replace('rounded-lg', 'rounded-full')
        return f'class=\"{class_str}\"'
    
    new_content = re.sub(r'class=\"([^\"]+)\"', replacer, content)
    
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f'Updated {filepath}')

for file in glob.glob('*.html'):
    update_buttons(file)
