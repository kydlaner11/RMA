## Semantic Versioning

This project use third library called [semantic-release](https://semantic-release.gitbook.io/semantic-release/) to manage versioning of this app. To start this library there is some step that need to be done first.

### Configure semantic-release:

Follow this instruction to configure semantic-release

- Buat file release.config.js
- Copy isi file release.config.js di project <a href="https://gitlab.dwp.io/dharma.putra/react-semantic-release/-/blob/main/release.config.js">ini</a>
- Buat file .gitlab-ci.yml
- Copy isi file .gitlab-ci.yml di project <a href="https://gitlab.dwp.io/dharma.putra/react-semantic-release/-/blob/main/.gitlab-ci.yml">ini</a>

### Configure gitlab CI variable

Follow this instruction to configure gitlab CI variable

- Pergi Preferences > Access Tokens atau tekan [link](https://gitlab.dwp.io/-/profile/personal_access_tokens)
- Buat variabel dengan nama CI_JOB_TOKEN centang yang api saja
- Copy hasil generated Token Name
- Pergi ke project yang ingin dipasang CI
- Di Sidebar pilih Settings > CI/CD
- Bagian Variables > Expand > Add Variable
- Key: GITLAB_TOKEN
  Value: (Paste generated Token Name)
- Centang Mask variable
- Tekan Add Variable
- Full docs [here](https://docs.gitlab.com/ee/ci/variables/#create-a-custom-cicd-variable-in-the-gitlab-ciyml-file)

### Setup Docker for gitlab-runner

Follow this instruction to configure gitlab-runner

- gitlab-runner using docker volume. read docs [here](https://docs.gitlab.com/runner/install/docker.html#option-2-use-docker-volumes-to-start-the-runner-container)

- Create docker volume:
  ```
  docker volume create gitlab-runner-<CUSTOM_NAME_HERE>
  ```
- Start the GitLab Runner container using the volume we just created:

  ```
  docker run -d --name gitlab-runner-<CUSTOM_NAME_HERE> --restart always \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v gitlab-runner-config-<CUSTOM_NAME_HERE>:/etc/gitlab-runner \
  gitlab/gitlab-runner:latest
  ```

- Run the register command for docker volume mounts:

  ```
  docker run --rm -it -v gitlab-runner-config-<CUSTOME_NAME_HERE>:/etc/gitlab-runner gitlab/gitlab-runner:latest register
  ```

  Follow this step after executes that command:

  - enter runner URL: (see in project > settings > CI/CD > Runners > Specific runners > point 2.1)
  - enter register token: (see in project > settings > CI/CD > Runners > Specific runners > point 2.2)
  - enter descripiton
  - enter tags: (i let it blank)
  - enter maintenance note: (i let it blank)
  - enter executor: (docker)
  - enter default image: (node:latest)

- Full docs [here](https://docs.gitlab.com/runner/install/)

### Commit message:

- Gunakan standarisasi commit dari semantic-release
  Examples:

  - Patch: (Bisa pilih salah satu)
    - fix(pipeline): schedule drift detection
    - perf(pencil): remove graphiteWidth option
  - Minor:
    - feat(ci-cd): enable automation for multiple environtment
  - Major: (Tidak bisa berdiri sendiri! diatasnya harus ada fix/perf/feat, dan BREAKING CHANGE harus ada dibawah)
    - BREAKING CHANGE: The graphiteWidth option has been removed.
      The default graphite width of 10mm is always used for performance reasons.

- Full docs [here](https://semantic-release.gitbook.io/semantic-release/#commit-message-format)
