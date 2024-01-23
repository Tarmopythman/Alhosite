import os
import json

def generate_page_info(root_folder):
    pages = []

    for folder_name in os.listdir(root_folder):
        folder_path = os.path.join(root_folder, folder_name)
        if os.path.isdir(folder_path):
            index_html_path = os.path.join(folder_path, 'index.html')

            if os.path.isfile(index_html_path):
                with open(index_html_path, 'r', encoding='utf-8') as html_file:
                    # Parse HTML file to get the title
                    for line in html_file:
                        if '<title>' in line:
                            title_start = line.index('<title>') + len('<title>')
                            title_end = line.index('</title>')
                            title = line[title_start:title_end].strip()
                            break
                    else:
                        title = f"No Title (Check {index_html_path})"

                pages.append({
                    'title': title,
                    'parentFolder': folder_name,
                    'folderPath': f'{folder_name}/',
                })

    return {'pages': pages}

def save_to_json(data, json_file):
    with open(json_file, 'w', encoding='utf-8') as json_out:
        json.dump(data, json_out, indent=2, ensure_ascii=False)

if __name__ == '__main__':
    root_folder = '.'  # Change this to the root folder of your pages
    json_file = 'pageInfo.json'

    page_info = generate_page_info(root_folder)
    save_to_json(page_info, json_file)

    print(f'Page info saved to {json_file}')
