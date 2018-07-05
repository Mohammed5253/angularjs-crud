<!DOCTYPE html>
<html>
<head>
	<title></title>
</head>
<body>
<table>
@foreach($data as $users)
    <tr>
        <td>{{$row->firstname}}</td>
        <td>{{$row->lastname}}</td>
        <td>
            <a href="#">Complete</a> | <a href="#">Edit</a> | <a href="#">Delete</a>
        </td>
    </tr>
@endforeach
</table>
</body>
</html>
