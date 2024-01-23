import os
import json
from bs4 import BeautifulSoup

def extract_title(html_path):
    with open(html_path, 'r', encoding='utf-8') as file:
        soup = BeautifulSoup(file, 'html.parser')
        title_tag = soup.find('title')
        return title_tag.text if title_tag else None

def clear_sitemap():
    with open('js/sitemap.json', 'w') as json_file:
        json_file.write("[]")

def generate_sitemap(build_folder, root_folder):
    sitemap = []

    for root, dirs, files in os.walk(build_folder):
        for file in files:
            if file.endswith('.html') and file == 'index.html':
                folder_name = os.path.relpath(root, root_folder).replace("\\", "/")
                relative_path = os.path.join(folder_name, file)
                absolute_path = '/' + relative_path
                title = extract_title(os.path.join(root, file))
                
                if title:
                    entry = {
                        'title': title,
                        'path': absolute_path
                    }
                    sitemap.append(entry)

    with open('js/sitemap.json', 'w', encoding='utf-8') as json_file:
        json.dump(sitemap, json_file, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    build_folder = 'build'
    root_folder = os.path.abspath(os.path.join(build_folder, os.pardir))
    
    # Clear the sitemap.json file
    clear_sitemap()

    # Generate a new sitemap.json
    generate_sitemap(build_folder, root_folder)
