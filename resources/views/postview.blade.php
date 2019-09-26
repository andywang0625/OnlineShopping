/**
 * Created by PhpStorm.
 * User: andy_
 * Date: 2019-09-26
 * Time: 17:41
 */
<html>
<head>
    <title>Posts View</title>
</head>
<body>
<ul>
    @foreach($posts as $post)
        <li>{{$post}}</li>
</ul>


</body>
</html>
