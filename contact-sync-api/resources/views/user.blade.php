<!DOCTYPE html>
<html>
<head>
	<title></title>
</head>
<body>
<table border=1>
@foreach($users as $data)
    <tr>
        <td>{{$data->firstname}}</td>
        <td>{{$data->lastname}}</td>
        <td>{{$data->email}}</td>
        <td>{{$data->phone}}</td>
        <td>{{$data->created_at}}</td>

        <td>
      <a href="">Edit</a> | <a href="#">Delete</a>
        </td>
    </tr>
@endforeach
</table>
</body>
</html>
