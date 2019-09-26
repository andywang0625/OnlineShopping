<html>
<head>
    <title>Posts View</title>
</head>
<body>
<ul>
    @foreach($posts as $post)
        <li>{{$post->title." ".$post->price." ".$post->number}}</li>
    @endforeach
</ul>


</body>
</html>
