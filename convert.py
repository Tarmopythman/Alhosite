import os
import subprocess

def convert_markdown_to_html(input_file, output_file):
    # Use Pandoc to convert Markdown to HTML
    command = f"pandoc {input_file} -o {output_file}"
    subprocess.run(command, shell=True)

def process_all_markdown_files(source_directory, build_directory):
    # Create the build directory if it doesn't exist
    if not os.path.exists(build_directory):
        os.makedirs(build_directory)

    # Recursively get a list of all Markdown files in the source directory and its subdirectories
    markdown_files = [os.path.join(root, f) for root, dirs, files in os.walk(source_directory) for f in files if f.endswith('.md')]

    # Convert each Markdown file to HTML
    for markdown_file in markdown_files:
        relative_path = os.path.relpath(markdown_file, source_directory)
        output_path = os.path.join(build_directory, os.path.splitext(relative_path)[0] + '.html')
        convert_markdown_to_html(markdown_file, output_path)

def main():
    # Set the source and build directories
    source_directory = 'source'
    build_directory = 'temp'

    process_all_markdown_files(source_directory, build_directory)

    print(f'Markdowns from {source_directory} converted to {build_directory}')

if __name__ == "__main__":
    main()

