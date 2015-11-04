# 第1章

在为元素命名时，在分配ID和类名时，一定要尽可能保持名称与表现方式无关。应该根据“它们是什么”来为元素命名，而不应该根据“它们的外观如何”来命名。这种方式让代码更有意义，并且避免代码与设计的不同步。有意义的类名的最大优点是可以在整个网站中重用它们。

类名和ID区分大小写。

类应该应用于概念上相似的元素，ID应该应用于不同的唯一的元素。

只有在绝对确定这个元素只会出现一次的情况下，才应该使用ID。

应该使用div根据条目的意义或功能（而不是根据它们的表现方式或布局）对相关条目进行分组。

div可以用来对块级元素进行分组，span可以用来对行内元素进行分组或标识。

# 第2章

最常用的选择器类型是类型选择器和后代选择器。

类型选择器用来寻找特定类型的元素，比如段落或标题元素。类型选择器有时也被称为元素选择器或简单选择器。

    p { color:black; }
    h1 { font-weight: bold; }

后代选择器可用来寻找特定元素或元素组的后代。后代选择器由其它两个选择器之间的空格表示。

    blockquote p { padding-left: 2em; }

要想寻找更特定的元素，可以使用ID选择器和类选择器。ID选择器用一个#字符表示，类选择器用一个点号表示。

    #intro { font-weight: bold; }
    .date-posted { color: #ccc; }
    <p id="intro">Happy Birthday Andyt</p>
    <p class="date-posted">24/3/2009</p>

可以组合使用类型，后代，ID和类这几种选择器。如果你发现自己在文档中添加了许多不必要的类，这可能是文档结构不合理的一个警告信号。

## 伪类选择器

有时候，我们需要根据文档结构之外的其它条件对元素应用样式，例如表单元素或链接的状态，可以使用伪类选择器完成。

    a:link { color:blue; }
    a:visited { color:green; }
    a:hover a:focus a:active { color:red; }

    tr:hover { background-color:red; }
    input:focus { background-color:yellow; }

:link和:visited称为链接伪类，只能应用于锚元素。:hover,:active和:focus称为动态伪类，理论上可以应用于任何元素。把伪类连接在一起，可以创建更复杂的行为。比如在已访问链接和未访问链接上实现不同的鼠标悬停效果。

    a:visited:hover { color:blue; }

## 通用选择器

通用选择器可能是最强大确实最少用的。通用选择器的作用就像是通配符，它匹配所有可用元素。

    * {
        padding: 0;
        marging: 0;
    }

在于其它选择器结合使用时，通用选择器可以用来对某个元素的所有后代应用样式，或者跳过这一级后代。

## 高级选择器

### 子选择器和相邻选择器

第一个高级选择器是子选择器。后代选择器选择一个元素的所有后代，而子选择器只选择元素的直接后代，即子元素。

	#nav > li {
    	background: url(folder.png) no-repeat left top;
        padding-left: 20px;
    }

有时，你可能需要根据一个元素与另一个元素的相邻关系对它应用样式。相邻同胞选择器可用于定位同一个父元素下某个元素之后的元素。例如，可以使用相邻同胞选择器让顶级标题后面的第一个段落显示为灰色粗体，并且字号比后续段落略微大一点儿。

	h2 + p {
    	font-size: 1.4em;
        font-weight: bold;
        color: #777;
    }

### 属性选择器

属性选择器可以根据某个属性是否存在或属性的值来寻找元素，可以实现非常强大的效果。

    acronym[title] {
        border-botton: 1px dotted #999;
    }

    acronym[title]:hover, acronym[title]:focus {
        cursor:help;
    }

还可以根据属性值应用样式。以下规则在链接旁边显示一个图像，以表示不推荐目标站点。

    a[rel="nofollow"] {
        background: url(nofollow.gif) no-repeat right center;
        padding-right: 20px;
    }

### 层叠和特殊性

即使在不太复杂的样式表中，寻找同一元素可能有两个或更多规则。CSS通过一个称为层叠(cascade)的过程处理这种冲突。层叠给每个规则分配一个重要程度。

重要度排序如下：

* 标有!important的用户样式
* 标有!important的作者样式
* 作者样式
* 用户样式
* 浏览器/用户代理应用的样式

然后，根据选择器的特殊性决定规则的次序。具有更特殊选择器的规则优先于具有一般选择器的规则。如果两个规则的特殊性相同，那么后定义的规则优先。

#### 特殊性

用style属性编写的规则总是比其它任何规则特殊。具有ID选择器的规则比没有ID选择器的规则个数。具有类选择器的规则比只有类型选择器的规则特殊。

#### 使用特殊性

在编写CSS时特殊性非常有用，因为它可以对一般元素应用一般样式，然后在特殊的元素上覆盖它们。

    p { color:black; }
    p.intro { color:grey; }

为了避免一般和特殊规则的覆盖太多造成混乱，建议保持一般性样式非常一般，特殊样式尽可能特殊。

#### 在主体标签上添加类或ID

一种有意思的特殊性用法是在主体(body)标签上应用类或ID。这样做之后，就可以根据页面或在站点范围内覆盖样式。

    body.news {
        /* add some styles */
    }

使用类标识页面类型，使用ID标识特定 页面，就可以非常灵活的控制站点的设计和布局。

#### 继承

应用样式的元素的 后代会继承样式的某些属性，比如颜色和字号。例如，如果将body元素的文本颜色 设置为黑色，那么body元素的所有后代也显示黑色的文本。继承让开放人员不必在元素的每个后代上添加相同的样式。

    p, div, h1, h2, h3, ul, ol, dl, li { color:black; }

正如恰当地使用层叠可以简化CSS，恰当地使用继承也可以减少代码中选择器的数量和复杂性。

## 组织和维护样式表

### 对文档应用样式

可以将样式放在style标签之间，从而直接在文档头上添加样式。这样不便于复用。可以在HTML中导入样式表，也可以在样式表中导入另一个样式表。

    <link href="/css/basic.css" rel="stylesheet" type="text/css" />
    <style type="text/css">
    <!--
    @import url("/css/advanced.css");
    -->
    </style>

    @import url(/css/layout.css);
    @import url(/css/typography.css);
    @import url(/css/color.css);

把CSS分割为多个样式表是一种常见的做法，但是导入样式表比链接样式表慢。而且多个文件导致从 服务器发送更多数据包，这些数据包的数量影响下载时间。使用单一CSS文件能把代码集中在一个地方。CSS使用C风格的注释。

#### 1.设计代码的结构

为了便于维护，最好把样式表划分为几大块。常常把最一般的规则放在最前面。然后处理更特殊的样式和辅助样式。然后处理布局和导航等结构性元素。

一般结构如下：

* 一般性样式
	* 主体样式
    * RESET样式
    * 链接
    * 标题
    * 其它元素

* 辅助样式
	* 表单
	* 通知和错误
	* 一致的条目

* 页面结构
	* 标题、页脚和导航
	* 布局
	* 其它页面结构元素

* 页面组件
	* 各个页面

* 覆盖样式

#### 2.自我提示

使用分组注释

#### 3. 删除注释和优化样式表

注释会使CSS文件显著增大，可以使用优化器删除注释，启用服务端压缩。

### 样式指南

样式指南可以是一个文档、网页或小型站点，解释代码那和站点的视觉设计是如何组合在一起的。


# 第3章 可视化格式模型

你需要掌握的3个最重要的CSS概念是浮动、定位和盒模型。这些概念控制在页面上安排和显示元素的 方式，形成CSS的基本布局。

## 3.1 盒模型概述

盒模型是CSS的基石之一，它指定元素如何显示以及(在某种程度上)如何相互交互。页面上的每一个元素都被看作一个矩形框。这个框由元素的内容、内边距、边框和外边距组成，链接： [Box model](http://www.w3.org/TR/CSS21/box.html)。图示：

![Box model](http://www.w3.org/TR/CSS21/images/boxdim.png)

内边距出现在内容区域的周围。如果在元素上添加背景，那么背景会应用于由内容和内边距组成的区域。添加边框会在内边距的区域外边加一条线。这些线可以有多种样式，比如实线、虚线或点线。边框外边的是外边距。外边距是透明的，用于控制元素之间的间隔。

内边距、边框和外边距都是可选的，默认值为0。但是很多元素由用户代理样式表设置外边距和内边距。可以使用选择器清除浏览器的默认样式。

    * {
        margin: 0;
        padding: 0;
    }

在CSS中，width和height指的是内容区域的宽度和高度。增加内边距、边框和外边距不会影响内容区域的尺寸，但是会增加元素框的总尺寸。

内边距、边框和外边距可以应用于一个元素的所有边，也可以应用于单独的边。外边距还可以是负值。

### 3.1.1 IE和盒模型

IE6在混杂模式中使用自己的非标准盒模型。这些浏览器的width属性不是内容的宽度，而是内容、内边距和边框的宽度总和。

### 3.1.2 外边距叠加

外边距叠加是一个相当简单的概念。简单地说，当两个或多个垂直外边距相遇时，它们将形成一个外边距，这个外边距的高度等于两个发生叠加的外边距的高度中的较大者。

当一个元素包含在另一个元素中时(假设没有内边距或边框将外边距分开)，它们的顶和/或底外边距也会发生叠加。

只有普通文档流中块框的垂直外边距才会发生外边距叠加。行内框、浮动框或绝对定位框之间的外边距不会叠加。

## 3.2 定位概述

### 3.2.1 可视化格式模型

p/h1/div等元素常常被称为块级元素。这意味着这些元素显示为一块内容，即“块框”。与之相反，strong和span等元素称为行内元素，因为它们的内容显示在行中，即“行内框”。

可以使用display属性改变生成的框的类型。这意味着，通过将display属性设置为block，可以让行内元素(比如锚)表现得像块级元素一样。还可以将display属性设置为none，从而隐藏元素，不占用文档空间。

CSS中有三种基本的定位机制：普通流、浮动和绝对定位。除非专门指定，所有框默认都在普通流中定位。普通流中元素框为位置由元素在HTML中的位置决定。

块级框从上到下一个接一个地垂直排列。框之间的垂直边距由框的垂直外边距计算出来。

行内框在一行中水平排列。可以使用水平内边距、边框和外边距调整它们的水平间距。但是，垂直内边距、边框和外边距不影响行内框的高度。同样，在行内框上设置显式的高度或宽度也没有影响。由一行形成的水平框称为行框，行框的高度总是足以容纳它包含的所有行内框。但是，设置行高可以增加这个框的高度。因此，修改行内框尺寸的唯一方法是修改行高或者水平边框、内边距或外边距。

CSS 2.1允许把元素的display属性设置为inline-block。这个声明让元素像行内元素一样水平地依次排列。但是，框的内容仍然符合块级框的行为，例如能够显式地设置宽度、高度、垂直外边距和内边距。

在将一些文本添加到一个块级元素(如div)的开头时，即使没有把这些文本定义为块级元素，它也会被当成块级元素对待。

    <div>
        some text
        <p>Some more text.</p>
    </div>

在这种情况下，这个框称为匿名块框，因为它不需要专门定义的元素相关联。

块级元素内的文本行也会发生类似的情况。假设有一个包含3行文本的段落。每行文本形成一个匿名块框。

### 3.2.2 相对定位

如果对一个元素使用相对定位，它将出现在它所在的位置上。然后可以通过设置垂直或水平位置，让这个元素“相对于”它的起点移动。

    #myBox {
        position:relative;
        left: 20px;
        top: 20px;
    }

在使用相对定位时，无论是否移动，元素仍然占据原来的空间。因此，移动元素会导致它覆盖其它框。

### 3.2.3 绝对定位

相对定位实际上被看做普通流定位模型的一部分，因为元素的位置是相对于它在普通流中的位置的。与之相反，绝对定位使元素的位置与文档流无关，因此不占据空间。普通文档流中其它元素的布局就像绝对定位的元素不存在时一样。

绝对定位的元素的位置是相对于距离它最近的那个已定位的祖先元素确定的。如果元素没有已定位的祖先元素，那么它的位置是相对于初始包含块的。根据用户代理的不同，出事包含块可能是画布或HTML元素。

与相对定位的框一样，绝对定位的框可以从它的包含块向上下左右移动。

注意：相对定位是“相对于”元素在文档流中的 初始位置，而绝对定位是“相对于”距离它最近的已定位祖先元素，如果不存在那么就是相对于初始包含块。

绝对定位的框与文档流无关，它们可以覆盖页面上的其它元素。可以通过设置z-index属性来控制这些框的叠放次序。z-indexx的值越大，框在栈中的位置就越高。

固定定位时绝对定位的一种。

### 3.2.4 浮动

浮动的框可以左右移动，直到它的外边缘碰到包含框或另一个浮动框的边缘。浮动框不在普通的文档流中，所以文档的普通流中的块框表现得就像浮动框不存在一样。

如果包含块太窄，无法容纳水平排列的三个浮动元素，那么其它浮动块向下移动，直到有足够空间的地方。

浮动框会让元素脱离文档流，不再影响不浮动的元素。但是，框的文本内容会受到浮动元素的影响，会移动以留出空间。浮动元素旁边的行框被缩短，从而给浮动元素留出空间，因此行框围绕浮动框。

要想阻止行框围绕在浮动框的外边，需要对包含这些行框的元素应用clear属性。clear属性的值可以是left、right、both或none，它表示框的哪些边不应该挨着浮动框。对元素进行clear实际上为前面的浮动元素留出了垂直空间。

overflow属性定义在包含的内容对于指定的尺寸太大的情况下元素应该怎么样。默认情况下，内容会溢出到框外，进入相邻的空间。应用值为hidden或auto的overflow属性有一个有用的副作用，这会自动clear包含的任何浮动元素。

    .clear:after {
        content: ".";
        height: 0;
        visibility: hidden;
        display: block;
        clear: both;
    }


# 第4章 背景图像效果

## 4.1 背景图像基础

    body {
        background-image: url(/img/pattern.gif)
    }

默认情况下，浏览器水平和垂直地重复显示背景图像，让图像平铺在整个页面上。可以选择背景图像是垂直平铺、水平平铺，还是根本不平铺。

    body {
        background-image: url(/img/gradient.gif)
        background-repeat: repeat-x;
        background-color: #ccc;
    }

品牌图像背景示例：

	#branding {
    	width: 700px;
        height: 200px;
        background-image: url(/img/branding.gif);
        background-repeat: no-repeat;
    }

使用背景图像创建项目符号：

	h1 {
    	padding-left: 30px;
        background-image: url(/img/bullet.gif);
        background-repeat: no-repeat;
        background-position: left center;
    }

如果使用像素设置背景位置，那么图像左上角到元素左上角的距离为指定的像素数。但是，使用百分比进行背景定位的工作方式不太一样。百分数定位并不对背景图像的左上角进行定位，而是使用图像上的一个点。例如，如果指定垂直和水平位置都是20%，实际上是将图像上距离左上角20%的点定位到父元素上距离左上角20%的位置。

background属性的简写方式：

	h1 {
    	background: #ccc url(/img/bullet.gif) no-repeat left center;
    }

## 4.2 圆角框

创建圆角框由很多种方式

### 4.2.1 固定宽度的圆角框

使用GIF背景的方式需要4个图像：两个顶部图像组成的顶部曲线，两个底部图像组成底部曲线和框的主体。

### 4.2.2 山顶角(Mountaintop corners)

不用创建有颜色的角图像，而是创建曲线形的位图角模板。这种方法只适合创建非常简单的框，但是非常灵活，便于复用。

#### 1. 多个背景图像

可以定义多个背景图像，使用CSS3实现。

    .box { background-image: url(/img/top-left.gif),
        url(/img/top-right.gif),
        url(/img/bottom-left.gif),
        url(/img/bottom-right.gif);
    background-repeat: no-repeat,
        no-repeat,
        no-repeat,
        no-repeat;
    background-position: top left,
        top right,
        bottom left,
        bottom right;
    }

    <div class="box">
        <h2>Headline</h2>
        <p>Content<p>
    </div>

#### 2. border-radius

直接使用CSS3的border-radius属性就可以实现圆角：

	.box {
    	border-radius: 1em;
    }

#### 3. border-image

这也是CSS3的新属性。它允许指定一个图像作为元素的边框。这个属性的优点是，可以根据一些简单的百分比规则把图像划分为9个区域，浏览器会自动地使用适当的部分作为边框的对应部分。这种技术称为九分法缩放，有助于避免在调整圆角框大小时通常会出现的失真。

	.box {
    	border-image: url(/img/corners.gif)
        25% 25% 25% 25% / 25px round round;
    }

## 4.3 投影

以前需要使用图像模拟，CSS3支持box-shadown属性，它可以与border-radius属性配合使用。

	<div class="box">
	</div>
	
	.box {
	  box-shadow: 3px 3px 6px #666;
	  border-radius: 6px;
	  width: 100px;
	  height: 100px;
	  background-color: #eee;
	}

## 4.4 不透明度

#### 1. CSS透明度

CSS透明度的主要问题是，除了对背景生效之外，应用它的元素的内容也会继承它。

#### 2. RGBA透明度

RGBA是一种同时设置颜色和透明度的机制。A代表Alpha透明度。

#### 3. PNG透明度

PNG格式的图片支持Alpha透明度

#### 4. CSS视差效果



# 第5章 对链接应用样式


## 5.1 简单的链接样式

	a { color: red; }
	a:link { color:blue; }
	a:visited { color:green; }
	a:hover, a:focus, a:active { color:red; }

其它元素也可以使用:hover, :active或:focus伪类选择器。

取消链接下划线示例(次序不能反了)：

	a:link, a:visited { text-decoration:none; }
	a:hover, a:focus, a:active { text-decoration:underline; }

相同优先级的规则，后面的会覆盖前面的，所以，建议按如下次序定义样式：

	a:link, a:visited, a:hover, a:focus, a:active

## 5.2 让下划线更有趣

简单的链接修饰，加粗

	a:link a:visited {
		text-decoration: none;
		font-weight: bold;
	}

当鼠标悬停时显示下划线，增强交互状态

	a:hover, a:focus, a:active {
		text-decoration: underline;
		font-weight: bold;
	}

为了突出显示某些链接，还可以为链接添加背景图像。

## 创建类似按钮的链接

	a.btn {
	  display:block;
	  width: 6em;
	  line-height: 1.4;
	  text-align: center;
	  text-decoration: none;
	  border: 1px solid #66a300;
	  background-color: #8cca12;
	  color: #fff;
	}

    <a href="#" class="btn">Book Now</a>

链接现在显示为块级元素，单击块中的任何地方都会激活链接。使用line-height而不是height能让按钮文本垂直居中。链接应该只用于GET请求，不要用于POST请求。

使用:hover伪类可以创建翻转效果，下面改进前面的例子，在鼠标悬停时设置链接的背景和文本颜色，实现简单的翻转(点击)效果。

	a.btn:hover {
	  background-color:#f7a300;
	  border-color:#ff7400;
	}

对于比较复杂的按钮，你可能会想到使用背景图像。

	a:link, a:visited {    	display: block;    	width: 203px;    	height: 72px;    	text-indent: -1000em;    	background: url(/img/button.png) left top no-repeat;	}
		a:hover, a:focus { background-image: url(/img/button-over.png); }
		a:active {		background-image: url(/img/button-active.png);	}

**CSS Sprite**

使用CSS精灵可以减少Web浏览器发出的服务器请求，会显著加快下载速度。另外，使用精灵把所有按钮、图标和各种图形集中在一个地方可以提高可维护性。是一种非常好的方法。

还可以使用CSS3的text-shadow、box-shadow和border-radius等属性创建按钮效果。

# 第6章 列表样式和导航条

6.1 基本列表样式

	<ul>
		<li>Read emails</li>
		<li>Write chapter</li>
		<li>Go shopping</li>
		<li>Cook dinner</li>
		<li>Watch Lost</li>
	</ul>
	
	ul {
	  margin: 0;
	  padding: 0;
	  list-style-image: none;
	}
	
	li {
	  background: url(/img/bullet.gif) no-repeat 0 50%;
	  padding-left: 30px;
	}

6.2 创建基本的垂直导航条

6.3 在导航条中突出显示当前页面

6.4 创建简单的水平导航条

6.5 创建图形化导航条

6.6 简化的标签页时导航

6.7 下拉菜单

6.8 CSS图像映射

6.9 远距离翻转

# 第7章 对表单和数据表格应用样式

## 7.1 对数据表格应用样式

caption一般用作表格的标题，summary属性用于表格标签，描述表格的内容，类似于图像标签的alt属性。利用thead、tbody和tfoot可以将表格划分为几个逻辑部分。一个表格只能使用一个thead和tfoot元素，但是可以使用多个tbody元素将复杂的表格划分为更容易管理的几部分。

行标题和列表提应该使用th而不是td标记，但是如果某些内容既是标题又是数据，那么它仍然应该使用td。表格标题可以设置值为row或col的scope属性，定义它们是行标题还是列表提。它们还可以设置rowgroup或colgroup的值，表示它们与多行或多列相关。

## 7.2 简单的表单布局

第一个元素是fieldset元素。fieldset用来对相关信息块进行分组。为了识别每个fieldset的用途，可以使用legend元素。legend就像是fieldset的标题。它尝尝在fieldset的顶部垂直居中。

label元素可以帮助添加结构和增加表单的可用性和可访问性。这个元素用来在每个表单元素中添加有意义的描述性标签。

隐式嵌套：

	<label>email <input name="email" type="text" /></label>

显式嵌套

	<label for="email">email</label>
	<input name="email" id="email" type="text" />

简单的表单布局：

```html
<fieldset>
    <legend>Your Contact Details</legend>
    <div>
        <label for="author">Name:</label>
        <input name="author" id="author" type="text" /> </div>
    <div>
        <label for="email">Email Address:</label>
        <input name="email" id="email" type="text" />
    </div>
    <div>
        <label for="url">Web Address:</label>
        <input name="url" id="url" type="text" /> </div>
</fieldset>
```

添加样式：

```css
fieldset {
  margin:1em 0;
  padding:1em;
  border:1px solid #ccc;
  background:#f8f8f8;
}

legend {
  font-weight:bold;
}

label {
  display:block;
  cursor:pointer;
}

input {
  width:20em;
}

input:focus {
  background:#ffc;
}
```

## 7.3 复杂的表单布局

多列复选很复杂。


# 第8章 布局

所有CSS布局技术的根本都是这3个基本概念：定位、浮动和外边距操纵。

## 8.1 计划布局

首先应检查设计，寻找重复的模式，在这个阶段不应该太关注表现方式。先把页面划分为大的结构性区域，比如容器、页眉、内容区域和页脚。然后将注意力转移到内容区域本身，开始建立网格结构。最后，在各个内容区域中寻找不同的布局结构。

## 8.2 设置基本结构

## 8.3 基于浮动的布局

### 8.3.1 两列的浮动布局

### 8.3.2 三列的浮动布局

## 8.4 固定宽度、流式和弹性布局

### 8.4.1 流式布局

在使用流式布局时，尺寸是用百分数而不是像素设置的。这使得流式布局能够相对于浏览器窗口进行伸缩。流式布局可以非常高效地利用空间。

### 8.4.2 弹性布局

弹性布局相对于字号来设置元素的宽度。以em为单位设置宽度，可以确保在字号增加时整个布局随之扩大。

### 8.4.3 流式和弹性图像

## 8.5 Faux列

## 8.6 高度相等的列

## 8.7 CSS3列

CSS3也可以创建等高文本列，通过column-count, column-width和column-gap属性实现。

## 8.8 CSS框架与CSS系统

# 第9章 错误调试

# 第10章 实例研究




