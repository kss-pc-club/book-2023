---
title: AIと一緒にゲームを作ろう！
author: tarokko
---

# AIと一緒にゲームを作ろう！

<span class="author">tarokko</span>

## はじめに

こんにちは。
6期生の tarokko です。
先日、幕張メッセで行われたイベントのゲーム大会に行く機会があったのでニンテンドー3DSを持って行ったのですが、一日で12人のプレイヤーとすれ違いました。
まだすれ違い通信をすることがあるのかと感動した反面、3DSというハードの時代の終わりを感じ、名残惜しく感じました。

本章では他の変態たち(誉め言葉)の記事を読んでよくわからないと思った人にも読みやすいように心がけ、プログラミングに関する知識がない人向けに注釈を入れた記事を書いていきますので、ぜひ最後までお読みいただけると幸いです。

## AIについて

昨今のAIの発達は凄まじく、ニュースでも取り上げられることが増えてきました。
具体的には対話型AIの ChatGPT や BingAI 、画像生成AIの Midjourney や Stable Diffusion などが話題に挙げられることが多いと思います。
それ以外にも作曲AIや小説AIなどが存在し、ジャンルは多岐にわたっています。
本章では、対話型AIの ChatGPT が出力したソースコード<span class="footnote">コンピュータに命令を与える文字列のこと</span>でゲームを作っていきます。

## ゲーム制作においてのルール

ゲームを作っていく前にいくつかルールを定めていきたいと思います。

1. 無料版の ChatGPT(GPT-3.5) にコードを出力させる
2. 使用言語は JavaScript
3. 動作環境は JSFiddle
4. 基本的にソースコードはAIが出力した文章をそのまま使用する
5. ソースコードに含まれる数値は例外として人の手による変更を許可する

これらのルールを定めた理由は以下の通りです。

1. 無料版であれば誰でも同じ環境が使用できるため、真似がしやすいから 。また、インターネットに上がっている似たような記事では、GPT-4を使っている記事がいくつか見受けられたため、それらとの差別化のため。
2. 環境構築<span class="footnote">あるシステムやソフトウェアを実行するために必要な設定を行うこと</span>の必要がないから。
3. ブラウザで実行<span clasds="footnote">コンピュータプログラムをコンピュータ上で動作させること</span>できるサービスの中でも、使いやすく感じたから。
4. AIでゲーム制作をするという趣旨のもと、人の手による介入を避け、AIが出力したソースコードだけでゲームを作っていくため。
5. 主に座標の値をいじることにより見栄えを良くするため。

ルールについては以上ですが、以降の内容を読んでいくにあたって1点だけ頭に入れておいてほしいことがあります。
それは、私はJavascriptについての知識は全く持っていないということです。
それどころかプログラミングの経験は約5年前にC言語という言語に触れただけ~~であり、そのC言語の記憶すらとても怪しい~~という状況です。
これらを踏まえたうえで以降を読むことで、プログラミングの知識がなくても簡単なゲームが作れてしまう時代に入りつつあるいうことを実感していただけると思います。

## ゲーム制作

ここからゲーム制作に手を付けていきます。
制作に失敗したゲームについても書いてあるため、制作に成功したゲームだけを読みたい方は **3 スネークゲーム**まで読み飛ばしてください。

### ドクターマリオ

始めに目を付けたゲームは **ドクターマリオ** です。
このゲームについては以下の通りです。

> このソフトは、1990年に発売されたファミリーコンピュータ用のアクションパズルゲームです。
> ドクターとなったマリオの研究室のビンに発生した3種類のウィルスを、次々と投げ入れるカプセルを使って退治していきます。
> ウィルスは同じ色のカプセルを縦か横に4個以上並べると消えます。
> カプセルを回転させたり移動させたりしながら積み上げていき、ビンの中のウィルスをすべて退治するとステージクリアです。
> 
> *任天堂ホームページから引用*

ウイルスとカプセルをそれぞれ3色の記号で表すことができるため、このゲームを作れると思い、試してみました。
できたコードとその実行結果がこちらです。

```html
<!DOCTYPE html>
<html>
<head>
	<title>Doctor Mario</title>
	<style>
		canvas {
			border: 1px solid black;
		}
	</style>
</head>
<body>
	<canvas id="canvas" width="480" height="640"></canvas>
	<script>
		const canvas = document.getElementById("canvas");
		const context = canvas.getContext("2d");

		const cellSize = 32;
		const numRows = canvas.height / cellSize;
		const numCols = canvas.width / cellSize;

		const colors = ["red", "blue", "yellow"];

		const viruses = [];
		for (let row = 0; row < numRows / 2; row++) {
			for (let col = 0; col < numCols; col++) {
				const x = col * cellSize + cellSize / 2;
				const y = row * cellSize + cellSize / 2;
				const color = colors[Math.floor(Math.random() * colors.length)];
				viruses.push({x, y, color});
			}
		}

		let capsule = {
			x: canvas.width / 2 - cellSize / 2,
			y: cellSize / 2,
			color1: colors[Math.floor(Math.random() * colors.length)],
			color2: colors[Math.floor(Math.random() * colors.length)]
		};

		function drawCapsule() {
			context.fillStyle = capsule.color1;
			context.fillRect(capsule.x, capsule.y, cellSize, cellSize);
			context.fillStyle = capsule.color2;
			context.fillRect(capsule.x, capsule.y + cellSize, cellSize, cellSize);
		}

		function rotateCapsule() {
			const temp = capsule.color1;
			capsule.color1 = capsule.color2;
			capsule.color2 = temp;
		}

		function drawViruses() {
			viruses.forEach(virus => {
				context.fillStyle = virus.color;
				context.beginPath();
				context.arc(virus.x, virus.y, cellSize / 2 - 2, 0, Math.PI * 2);
				context.fill();
			});
		}

		function checkCollision() {
			const cells = [
				[Math.floor(capsule.y / cellSize), Math.floor(capsule.x / cellSize)],
				[Math.floor((capsule.y + cellSize) / cellSize), Math.floor(capsule.x / cellSize)]
			];
			let collided = false;
			cells.forEach(cell => {
				if (cell[0] >= numRows || cell[1] >= numCols) {
					collided = true;
				} else {
					viruses.forEach(virus => {
						if (cell[0] === Math.floor(virus.y / cellSize) && cell[1] === Math.floor(virus.x / cellSize)) {
							collided = true;
						}
					});
				}
			});
			return collided;
		}

		function mergeCapsule() {
			const cells = [
				[Math.floor(capsule.y / cellSize), Math.floor(capsule.x / cellSize)],
				[Math.floor((capsule.y + cellSize) / cellSize), Math.floor(capsule.x / cellSize)]
      ];
      cells.forEach(cell => {
        viruses.forEach(virus => {
          if (cell[0] === Math.floor(virus.y / cellSize) && cell[1] === Math.floor(virus.x / cellSize)) {
            virus.color = capsule.color1;
          }
        });
      });
      capsule.color1 = capsule.color2;
      capsule.color2 = colors[Math.floor(Math.random() * colors.length)];
      capsule.x = canvas.width / 2 - cellSize / 2;
      capsule.y = cellSize / 2;
    }

    function clearViruses() {
      const groups = [];
      viruses.forEach(virus => {
        let foundGroup = false;
        groups.forEach(group => {
          if (group.color === virus.color) {
            group.viruses.push(virus);
            foundGroup = true;
          }
        });
        if (!foundGroup) {
          groups.push({
            color: virus.color,
            viruses: [virus]
          });
        }
      });
      groups.forEach(group => {
        if (group.viruses.length >= 4) {
          group.viruses.forEach(virus => {
            const index = viruses.indexOf(virus);
            viruses.splice(index, 1);
          });
        }
      });
    }

    function draw() {
      context.clearRect(0, 0, canvas.width, canvas.height);
      drawViruses();
      drawCapsule();
      if (checkCollision()) {
        mergeCapsule();
        clearViruses();
      } else {
        capsule.y += cellSize / 10;
      }
    }

    document.addEventListener("keydown", event => {
      if (event.code === "ArrowLeft") {
        capsule.x -= cellSize;
      } else if (event.code === "ArrowRight") {
        capsule.x += cellSize;
      } else if (event.code === "ArrowUp") {
        rotateCapsule();
      }
    });
	  setInterval(draw, 50);
  </script>

cellSize), Math.floor(capsule.x / cellSize)]
];
cells.forEach(cell => {
viruses.forEach(virus => {
if (cell[0] === Math.floor(virus.y / cellSize) && cell[1] === Math.floor(virus.x / cellSize)) {
virus.color = capsule.color1;
}
});
});
capsule.color1 = capsule.color2;
capsule.color2 = colors[Math.floor(Math.random() * colors.length)];
capsule.x = canvas.width / 2 - cellSize / 2;
capsule.y = cellSize / 2;
}

scss
Copy code
	function clearViruses() {
		const groups = [];
		viruses.forEach(virus => {
			let foundGroup = false;
			groups.forEach(group => {
				if (group.color === virus.color) {
					group.viruses.push(virus);
					foundGroup = true;
				}
			});
			if (!foundGroup) {
				groups.push({
					color: virus.color,
					viruses: [virus]
				});
			}
		});
		groups.forEach(group => {
			if (group.viruses.length >= 4) {
				group.viruses.forEach(virus => {
					const index = viruses.indexOf(virus);
					viruses.splice(index, 1);
				});
			}
		});
	}

	function draw() {
		context.clearRect(0, 0, canvas.width, canvas.height);
		drawViruses();
		drawCapsule();
		if (checkCollision()) {
			mergeCapsule();
			clearViruses();
		} else {
			capsule.y += cellSize / 10;
		}
	}

	document.addEventListener("keydown", event => {
		if (event.code === "ArrowLeft") {
			capsule.x -= cellSize;
		} else if (event.code === "ArrowRight") {
			capsule.x += cellSize;
		} else if (event.code === "ArrowUp") {
			rotateCapsule();
		}
	});

	setInterval(draw, 50);
</script>
</body>
</html>
```

![ドクターマリオ失敗作](./Image_DrMario_failed.png) 

左上で絶えず生成される緑色のウイルス？達がぷかぷか浮いて、横に出現するカプセルが落ちるのをただひたすらに見守るゲームが完成しました。
ちなみにカプセルが一番下まで到達すると Score が -100 されます。~~個人的にはこれはこれで意味不明すぎて面白いのでアリ。~~

このあとも試行錯誤を重ねてみたのですが、残念ながらこれが一番まともなコードでした。作ることができなかった原因としては初期状態で発生するウイルスのコードを組むことが難しいからだと考えました。

### ぷよぷよ

ドクターマリオは諦め、次に**ぷよぷよ**を作ってみようと思いました。このゲームについては以下の通りです。

> 同じ色の"ぷよ"を４つつなげて消していくシンプルなルールで、行く手をはばむゆかいなキャラクターたちと対戦していくアクションパズルゲームです。(セガ公式サイトから引用)

ウイルスという障壁がなくなったのでどうにかなるだろうと思い、試してみました。
できたコードとその実行結果がこちらです。

```html
<!DOCTYPE html>
<html>
<head>
  <title>Puyo Puyo</title>
  <style>
    #field {
      width: 220px;
      height: 440px;
      background-color: #ccc;
      border: 2px solid #666;
    }
    .block {
      width: 20px;
      height: 20px;
      border: 1px solid #666;
      box-sizing: border-box;
      position: absolute;
    }
    .red {
      background-color: red;
    }
    .green {
      background-color: green;
    }
    .blue {
      background-color: blue;
    }
    .yellow {
      background-color: yellow;
    }
  </style>
</head>
<body>
  <div id="field"></div>
  <script>
    const colors = ["red", "green", "blue", "yellow"];
    let currentPuyo = null;
    const field = [];
    for (let i = 0; i < 22; i++) {
      const row = [];
      for (let j = 0; j < 12; j++) {
        row.push(null);
      }
      field.push(row);
    }
    const fieldElement = document.getElementById("field");

    function render() {
      for (let i = 0; i < 22; i++) {
        for (let j = 0; j < 12; j++) {
          const block = field[i][j];
          if (block !== null) {
            block.style.top = i * 20 + "px";
            block.style.left = j * 20 + "px";
          }
        }
      }
    }

    function createPuyo() {
      const puyo1 = document.createElement("div");
      const puyo2 = document.createElement("div");
      const color1 = colors[Math.floor(Math.random() * colors.length)];
      const color2 = colors[Math.floor(Math.random() * colors.length)];
      puyo1.classList.add("block", color1);
      puyo2.classList.add("block", color2);
      puyo2.style.top = "20px";
      currentPuyo = [puyo1, puyo2];
      fieldElement.appendChild(puyo1);
      fieldElement.appendChild(puyo2);
      puyo1.style.left = "80px";
      puyo2.style.left = "100px";
    }

    function canMoveDown() {
      const [puyo1, puyo2] = currentPuyo;
      const [x1, y1] = getBlockCoords(puyo1);
      const [x2, y2] = getBlockCoords(puyo2);
      if (x2 >= 21 || field[x2 + 1][y2] !== null) {
        return false;
      }
      if (x1 >= 21 || field[x1 + 1][y1] !== null) {
        return false;
      }
      return true;
    }

      function moveDown() {
        if (!canMoveDown()) {
          fixCurrentPuyo();
          createPuyo();
          return;
        }
        const [puyo1, puyo2] = currentPuyo;
        const [x1, y1] = getBlockCoords(puyo1);
        const [x2, y2] = getBlockCoords(puyo2);
        field[x1][y1] = null;
        field[x2][y2] = null;
        field[x1 + 1][y1] = puyo1;
        field[x2 + 1][y2] = puyo2;
        render();
        setTimeout(moveDown, 500);
      }

      function getBlockCoords(block) {
        const top = parseInt(block.style.top);
        const left = parseInt(block.style.left);
        const x = Math.round(top / 20);
        const y = Math.round(left / 20);
        return [x, y];
      }

      function fixCurrentPuyo() {
        const [puyo1, puyo2] = currentPuyo;
        const [x1, y1] = getBlockCoords(puyo1);
        const [x2, y2] = getBlockCoords(puyo2);
        field[x1][y1] = puyo1;
        field[x2][y2] = puyo2;
        currentPuyo = null;
      }

      createPuyo();
      setTimeout(moveDown, 500);
      
    </script>
  </body>
</html>
```
![ぷよぷよ失敗作](./Image_Puyopuyo_failed.png)

パッと見それっぽくはなりましたが、ランダムな色のぷよが生成されるだけのプログラムになってしまいました。何度実行してもぷよの色が変わる以外の変化はなく、このあと試行錯誤してもぷよが動くことはなかったです。
残念ながらこれも失敗に終わってしまいました。

### スネークゲーム

落ち物パズルは難しいと思い、作るゲームのジャンルを大幅に変えてみました。Google で**ヘビゲーム**や**スネークゲーム**などと検索すると遊ぶことができるゲームを目標に作っていきます。

このゲームではプレイヤーがヘビを操作し、フィールドに存在するフルーツをたくさん食べることが目的のゲームです。フィールドの壁やヘビ自身の体にヘビの頭が衝突するとゲームオーバーとなります。
また、フルーツを食べることでヘビの体が長くなり、だんだん難易度が上がっていくというものになっています。

これまでの2つのゲームでは「Javascriptで動く〇〇のコードを出力して」から始まり、何度も出力をさせた結果のコードを載せていたのですが、今回はなんと最初の出力でこのコードとその実行結果が出力されました。

```Javascript
<!DOCTYPE html>
<html>
<head>
	<title>Snake Game</title>
	<style>
		canvas {
			border: 1px solid black;
		}
	</style>
</head>
<body>
	<canvas id="gameCanvas" width="400" height="400"></canvas>
	<script>
		// ゲーム画面の設定
		var canvas = document.getElementById("gameCanvas");
		var ctx = canvas.getContext("2d");
		var blockSize = 10;
		var width = canvas.width / blockSize;
		var height = canvas.height / blockSize;

		// スネークの初期位置
		var snake = [];
		snake[0] = {x: 5, y: 5};

		// フルーツの初期位置
		var fruit = {x: Math.floor(Math.random() * width), y: Math.floor(Math.random() * height)};

		// スコアとゲームオーバーの設定
		var score = 0;
		var gameOver = false;

		// ゲームループ
		function gameLoop() {
			if (gameOver) {
				return;
			}

			setTimeout(function() {
				requestAnimationFrame(gameLoop);
				draw();
			}, 100);
		}

		// 描画
		function draw() {
			// スネークの移動
			var head = {x: snake[0].x, y: snake[0].y};
			if (direction === "right") {
				head.x++;
			} else if (direction === "left") {
				head.x--;
			} else if (direction === "up") {
				head.y--;
			} else if (direction === "down") {
				head.y++;
			}
			snake.unshift(head);

			// フルーツを取得した場合
			if (head.x === fruit.x && head.y === fruit.y) {
				score++;
				fruit = {x: Math.floor(Math.random() * width), y: Math.floor(Math.random() * height)};
			} else {
				snake.pop();
			}

			// ゲームオーバーの判定
			if (head.x < 0 || head.x >= width || head.y < 0 || head.y >= height) {
				gameOver = true;
			}
			for (var i = 1; i < snake.length; i++) {
				if (snake[i].x === head.x && snake[i].y === head.y) {
					gameOver = true;
				}
			}

			// 背景を描画
			ctx.fillStyle = "#ccc";
			ctx.fillRect(0, 0, canvas.width, canvas.height);

			// スネークを描画
			ctx.fillStyle = "green";
			for (var i = 0; i < snake.length; i++) {
				ctx.fillRect(snake[i].x * blockSize, snake[i].y * blockSize, blockSize, blockSize);
			}

			// フルーツを描画
			ctx.fillStyle
		ctx.fillStyle = "red";
		ctx.fillRect(fruit.x * blockSize, fruit.y * blockSize, blockSize, blockSize);

		// スコアを表示
		ctx.fillStyle = "black";
		ctx.font = "20px Arial";
		ctx.fillText("Score: " + score, 10, 30);
	}

	// キーボード入力
	var direction = "right";
	document.addEventListener("keydown", function(event) {
		if (event.keyCode === 37 && direction !== "right") {
			direction = "left";
		} else if (event.keyCode === 38 && direction !== "down") {
			direction = "up";
		} else if (event.keyCode === 39 && direction !== "left") {
			direction = "right";
		} else if (event.keyCode === 40 && direction !== "up") {
			direction = "down";
		}
	});

	// ゲームを開始
	gameLoop();
</script>
</body>
</html>
```
![スネークゲーム1](./Image_snake1.jpg)
![スネークゲーム2](./Image_snake2.jpg)

**ちゃんと動く！！！すげぇ！！！**

画像しか載せることができないというのがとても歯がゆいですがこのゲームの最低限のルールをおさえたコードが一瞬で出てきました。
そしてスネークゲームを作れというだけの命令だったにもかかわらず、出力されたコードにこれらの機能が実装されていたのには驚愕でした。
- ヘビがフルーツを食べるとScoreが増える点
- ヘビの体や壁に当たるとゲームが進行不能 = ゲームオーバーになる点
- コメントでそのコードが何を表しているか説明してくれている点

この後も改良を重ね、この記事の提出時点では、ゲームオーバーになったときにリトライするためのボタンの実装を完了させました。
文化祭当日ギリギリまで改良を重ねていきますので、ぜひ遊んでいただけると幸いです。

## おわりに

本章ではAIでゲームを作ってもらうことをテーマに、制作過程を紹介してきました。しかし、AIでゲームが作れるからといってプログラミングの勉強をしなくてもよいかというと、実はそうではありません。AIが生成するコードにもミスが含まれているため、それを修正できるほどの理解はしておくべきだと思います。

また、AIで生成したゲームを公開するときにも注意が必要です。あくまでもゲームを作ったのは自分ではなくAIです。ソースコードやゲームを公開する際にはそれを念頭に置いて、節度を守った利用を心がけるようにしましょう。

## 参考文献

- Introducing ChatGPT (https://openai.com/blog/chatgpt)
- jsfiddle (https://jsfiddle.net/)
- GPT-4を使って ぷよぷよ 作ってみたときの感想 (https://zenn.dev/corocn/articles/b4c473ed779935)
- GPT-4だけで作ったpackman… (https://twitter.com/shotyas/status/1636261249297297409?s=20)
- GPT-4に「ブラウザで動くテトリス作って」って言ったら一瞬でできた😮… (https://twitter.com/djrio_vr/status/1636230792799215616?s=20)
- ドクターマリオ｜Wii U｜任天堂 (https://www.nintendo.co.jp/titles/20010000003946)
- SEGA AGES ぷよぷよ (https://archives.sega.jp/segaages/puyo/)
