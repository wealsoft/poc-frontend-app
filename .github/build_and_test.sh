#!/usr/bin/env sh

##################  Description  ###################
# AppSrc内でビルドする処理を記述するためのシェル

# このシェルで実施が必要な処理

# 1. シェルの実行はレポジトリのルートディレクトリになるため、package.jsonが存在するディレクトリへ移動してからyarnコマンドを実行する
# 2. Github PagesへのデプロイおよびIntegrationTestは別ジョブで実行するため、一時的にGithub Artifactへ格納する必要がある。ここにアップロードするために、UPLOAD_FILES_PATHへビルド成果物を格納する。
####################################################

#####################  引数  #######################
# Github PagesへのデプロイおよびIntegrationTestを実施するビルド成果物（index.html , main.js....）を格納するためのディレクトリ
UPLOAD_FILES_PATH=$1
####################################################

####################################################
# 依存ライブラリのインストール
####################################################

echo "########## Install packages ##########"
cd ./sample_app
yarn install

####################################################
# 単体テスト
####################################################

echo "########## Lint & Jest ##########"
yarn lint
# yarn test

####################################################
# srcビルド
####################################################

echo "########## Build ##########"
yarn run build

# 資材をGithub Artifactへ格納し、後続のジョブで統合テスト・デプロイが実行される
cp -pr ./out/* $UPLOAD_FILES_PATH
find $UPLOAD_FILES_PATH

####################################################
# Seleniumを使用した統合テスト
####################################################

# Start Next.js application in the background
# echo "########## Integration Test ##########"
# yarn run start > /dev/null 2>&1 &
# echo "Next.js is running..."

# echo "Run Selenium tests"
# cd ./selenium
# node sample_test.cjs
# echo "Finished Selenium tests"