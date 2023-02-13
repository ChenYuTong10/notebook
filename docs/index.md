# ⚙️ Centralized Management System

Centralized Management System is a repository including some normal softwares, such as `nginx`, `jenkins`, which are used to centrally manage web application.

To setup these softwares more easily, The repository is based on **Docker**. It provides their corresponding *Dockerfile* and *docker-compose.yml*.

# 💡 Problems

1. The image pulling from registry is slow in China.

    It is a normal phenomenon that pulling image from docker hub is slow in China. So changing the registry to specific CR maintaining by each service provider is a good idea.

    There are multiple crs you can choose. You can get the speend of these mirrors on this [page](https://github.com/docker-practice/docker-registry-cn-mirror-test). 
    - Official registry: https://docker.io, https://registry.hub.docker.com, https://registry-1.docker.io
    - Google registry: https://mirror.gcr.io
    - Baidu registry: https://mirror.baidubce.com
    - Netease registry: https://hub-mirror.c.163.com
    - USTC registry: https://docker.mirrors.ustc.edu.cn
    - Aliyun registry: https://www.aliyun.com/product/acr

    When you select one of those, execute following command:
    ```bash
    $ sudo tee /etc/docker/daemon.json <<-'EOF' { "registry-mirrors": [
    "your mirror address"] } EOF
    $ sudo systemctl daemon-reload
    $ sudo systemctl restart docker
    ``` 
    Now you can try to pull the image again.
