## 概要

倉庫管理システムは、最新技術を活用し、効率的で直感的な倉庫管理を実現する革新的なウェブベースツールです。商品や在庫、顧客、仕入先の管理から、入出庫のトラッキングまでを一元化し、業務の生産性を大幅に向上させます。モバイルデバイス対応のレスポンシブデザインにより、いつでもどこからでもアクセス可能です。

## システム紹介

###### 技術

- バックエンド：SpringBoot, Shiro, MybatisPlus

- フロントエンド：HTML, Css, JavaScript, LayUI, Dtree

###### 環境

- 開発環境：IDEA/Eclipse

- 実行環境：JDK 1.8, Mysql 5.7以上, Maven

## 機能紹介

##### 基本管理

###### a.顧客管理

- 顧客追加：顧客名、住所、担当者名、電話番号などを入力して顧客を登録。

- 顧客変更：登録済みの顧客情報を編集。

- 顧客検索：顧客名、担当者名、電話番号で検索。部分一致検索が可能。結果を顧客IDや顧客名でソート可能。

- 顧客削除：指定した顧客の情報を削除。

###### b.仕入先管理

- 仕入先追加：仕入先名、住所、担当者名、電話番号を入力して登録。

- 仕入先変更：登録済みの仕入先情報を編集。

- 仕入先検索：仕入先名、担当者名、電話番号で検索。部分一致検索が可能。結果を仕入先IDや仕入先名でソート可能。

- 仕入先削除：指定した仕入先を削除。

###### c.商品管理

- 商品追加：仕入先名、商品名、価格、仕様、規格を入力して登録。

- 商品変更：登録済みの商品情報を編集。

- 商品検索：仕入先名、商品名、価格で検索。商品名の部分一致検索が可能。結果を商品IDや商品名でソート可能。

- 商品削除：指定した商品を削除。

##### 倉庫管理

###### a.入庫管理

- 入庫追加：仕入先名、商品名、倉庫名、数量を入力して登録。

- 入庫検索：仕入先名や入庫番号で検索。結果を入庫番号、倉庫名、商品名、作成日時でソート可能。

- 入庫削除：指定した入庫レコードを削除。

###### b.出庫管理

- 出庫追加：倉庫名、商品名、顧客名、数量を入力して登録。

- 出庫検索：顧客名や出庫番号で検索。結果を出庫番号、顧客名、商品名、作成日時でソート可能。

- 出庫削除：指定した出庫レコードを削除。

###### c.在庫管理

- 倉庫追加：倉庫名、住所、警戒上限、警戒下限などの情報を入力して追加する。管理ユーザのみ使用可能。

- 倉庫変更：上記倉庫情報を変更する。

- 倉庫検索：倉庫名、商品名などを指定して検索する。検索結果の倉庫名、商品名や価格によりソートが可能。

- 倉庫削除：指定倉庫を削除する。

##### システム管理（管理ユーザ限定）

###### a.ロール管理

- ロール追加：ロール名、説明、有効状態を入力して登録。

- ロール変更：登録済みのロール情報を編集。

- ロール検索：ロール名、説明、有効状態で検索。部分一致検索可能。結果をロールIDでソート可能。

- ロール削除：指定したロールを削除。

###### b.ユーザ管理

- ユーザ追加：氏名、アカウント名、ロールID、パスワード、年齢、性別を入力して登録。

- ユーザ変更：登録済みのユーザ情報を編集。

- ユーザ検索：氏名やアカウント名で検索。部分一致検索可能。結果をユーザIDでソート可能。

- ユーザ削除：指定したユーザを削除。

##### 共通機能

- 検索結果をCSV/Excel形式でエクスポート可能。

- 検索結果の列を選択して絞り込み可能。

- 同じ画面で複数の操作画面を開くことが可能。

- 入力内容に対して自動チェックを実施。

## 画像

ログイン画面

![](.\images\login.png)

トップページ
