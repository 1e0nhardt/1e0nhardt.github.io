import os
from rich import print
import shutil


def copy_folder(source_folder, destination_folder):
    shutil.copytree(source_folder, destination_folder, dirs_exist_ok=True)


def find_md_files(folder_path):
    md_files = []
    for root, dirs, files in os.walk(folder_path):
        for file in files:
            if file.endswith('.md'):
                md_files.append(os.path.join(root, file))
    return md_files


def add_slash_to_image_links(filename):
    """
    `![](assets/images/xx) => ![](/assets/images/xx)`
    """
    with open(filename, 'r', encoding='UTF-8') as file:
        lines = file.readlines()

    modified_lines = []
    modifed_flag = False
    for line in lines:
        if line.lstrip().startswith('![') and '(' in line:
            parts = line.split('(')
            if not parts[1].startswith("assets"): # 已经以/开头了，或是来源于网络的图片等，则不变
                modified_lines.append(line)
                continue
            image_link = parts[1].strip()
            modified_link = '/' + image_link
            modified_line = parts[0] + '(' + modified_link
            modified_lines.append(modified_line)
            print(f'{line}->{modified_line}')
            modifed_flag = True
        else:
            modified_lines.append(line)
    
    if modifed_flag:
        with open(filename, 'w', encoding='UTF-8') as file:
            file.writelines(modified_lines)
    
    return modifed_flag


if __name__ == '__main__':
    # 将obsidian附件图片移动到public目录下
    source_folder = 'src/assets/images'
    destination_folder = 'src/.vuepress/public/assets/images'
    copy_folder(source_folder, destination_folder)

    # 修改obsidian链接，在链接前添加一个"/"
    count = 0
    modified_files = []
    for filename in find_md_files("src"):
        ret = add_slash_to_image_links(filename)
        if ret:
            count += 1
            modified_files.append(filename)
        
    print(count)
    print(modified_files)
