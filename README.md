# 他のスプレッドシートから特定のデータを抜き出すサンプル

## 使い方

1) 新しくスプレッドシートを作成します。

2) 作ったスプレッドシートに設定と日付のシートを追加します。

3) 設定のシートに対象となるスプレッドシートIDを記入します。

<p align="center">
  <img src="./images/screen01.png" width="50%" />
</p>

4) 日付のシートに抜き出したいシートのシート名を記入します。

<p align="center">
  <img src="./images/screen02.png" width="50%" />
</p>

5) スクリプトエディタから sorp-menu.gs のスクリプトをコピペして入れ替えます。

<p align="center">
  <img src="./images/screen03.png" width="50%" />
</p>

<p align="center">
  <img src="./images/screen04.png" width="50%" />
</p>

6) 保存して現在のプロジェクトのトリガーを選択します。
例では sorp-menu という名前で保存しています。

<p align="center">
  <img src="./images/screen05.png" width="30%" />
</p>

7) 次のような設定で保存します。
実行する関数は onOpen にします。

<p align="center">
  <img src="./images/screen06.png" width="50%" />
</p>

8) スプレッドシートに戻り、ページをリロードすると、sorp-menu というメニューが現れます。

<p align="center">
  <img src="./images/screen07.png" width="80%" />
</p>

9) 抜き出す対象のシートの２列目の値をシート名にして、生徒別SOAPを実行します。

<p align="center">
  <img src="./images/screen08.png" width="60%" />
</p>
