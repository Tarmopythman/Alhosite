import os
import subprocess

def convert_markdown_to_html(input_file, template_file, output_file):
    # Use Pandoc to convert Markdown to HTML with the specified template
    command = f"pandoc {input_file} -o {output_file} --template={template_file}"
    subprocess.run(command, shell=True)

def process_all_markdown_files(source_directory, template_file, build_directory):
    # Create the build directory if it doesn't exist
    if not os.path.exists(build_directory):
        os.makedirs(build_directory)

    # Get a list of all Markdown files in the source directory
    markdown_files = [f for f in os.listdir(source_directory) if f.endswith('.md')]

    # Convert each Markdown file to HTML using the specified template
    for markdown_file in markdown_files:
        input_path = os.path.join(source_directory, markdown_file)
        output_path = os.path.join(build_directory, os.path.splitext(markdown_file)[0] + '.html')
        convert_markdown_to_html(input_path, template_file, output_path)

def main():
    # Set the source, build directories, and template file
    source_directory = 'source'
    build_directory = 'build'
    template_file = 'template.html'

    process_all_markdown_files(source_directory, template_file, build_directory)

if __name__ == "__main__":
    main()
