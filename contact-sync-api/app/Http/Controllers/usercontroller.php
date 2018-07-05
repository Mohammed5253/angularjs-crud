<?php
namespace App\Http\Controllers;
use DB;
use Auth;
use App\user;
use App\contact;
use App\Tag;
use App\contacttag; 
use Route;
use App\Http\Requests;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Input;
use App\Exceptions\Handler;
use Illuminate\Http\Request;




class usercontroller extends Controller
{
     public function index()
    {
        $users = user::all();	
    }

    public function show($id)
    {
    	$users=DB::table('users')->where('id',$id)->get();
        return $users;
    }

    

    public function login(Request $request)
    {
       $credentials = array(
                'email' => $request->email,
                'password' => $request->password
            );

       if($users=DB::table('users')->where('email',$request->email)->where('password',$request->password)->get())
        {
            return $users;
        }
       else
       {
            return "wrong Credentials";
       }

    }

    
    public function store(Request $request)
    {
        $id='';
        $contact = new contact();
        $contact->photo = $request->input('photo');           
        $contact->firstname = $request->input('firstname');
        $contact->lastname = $request->input('lastname');
        $contact->email = $request->input('email');
        $contact->address1 = $request->input('add1');
        $contact->address2 = $request->input('add2');       
        $contact->phone = $request->input('phone');
        $contact->city = $request->input('city');
        $contact->pin = $request->input('pincode');
        $contact->country = $request->input('country');
        $contact->company = $request->input('company');
        $contact->source = $request->input('source');
        $contact->created_by = $request->input('user_id');
        $id=Input::get("user_id");
        $uid = user::find($id);
        $contact->user()->associate($uid);  
        $contact->save();
        $contactid = $contact->id;
        $relatedTags = $request->tags;
             // return $relatedTags;

           
          foreach($relatedTags as $tag)
        {
            try{
                $newtag=  new Tag();
                $newtag->id = $tag['id'];
                $newtag->name = $tag['name'];
                $newtag->user_id=Input::get("user_id");
                $newtag->save();

            $contact->tag()->attach($tag['id']);
        }
            catch(\Illuminate\Database\QueryException $e){
            $contact->tag()->attach($tag['id']);

            }
        }     
        return $contact;
    }
   
    public function contact($id)
    {  
        $users = contact::get()->where('user_id', $id);
        //$tags = Tag::get()->where('user_id', $id)->pluck('name');
                
        if($users->isEmpty())
        {
            return "No contact Available";
        }
        
        else
        {
            $ee = sizeof($users);
            foreach ($users as $key => $value) {
            $tags = DB::table('contact_tag')
                           ->where('contact_id', $value->id)
                           ->get();
                            if($tags != [] ||$tags != '' || $tags != undefined){
                                foreach ($tags as $keys => $values) {
                                    $tg = DB::table('tags')->where('id', $values->tag_id)->pluck('name');
                                    $tags[$keys] = $tg;

                                 }
                            $users[$key]->tags = $tags;
                            }
                        }
                        return $users;
        }
                    
    }

   
    public function search(Request $request)
    {
        $newtag = new Tag();
        $newtag->name = $request->input('consearch');
        $id=Input::get("userid");
        $uid = user::find($id);
        $newtag->user()->associate($uid);  
        $newtag->save();
    }

     public function tag($id)
    {
        $user_info = DB::table('contacts')
                    ->where('user_id',$id)
                    ->join('contact_tag','contacts.id','=','contact_tag.contact_id')
                    ->select('tag_id',DB::raw('count(*) as total'))
                    ->groupBy('tag_id')
                    ->orderBy('total','dsc')
                    ->take(10)
                    ->pluck('tag_id');
       $z=[];
        //return sizeof($user_info);
        for($i=0;$i<sizeof($user_info);$i++)
        {
            $x=  DB::table('tags')
                    ->where('id',$user_info[$i])->get();
            array_push($z, $x);
        }
        return array_flatten($z);
    }

     public function alltags()
    {   
        $users = Tag::all();
        return $users;
    }

   
    public function edit($id)
    {
        // get the contact
        $tagarray=[];
        $edit = contact::find($id);
       
        $tags = DB::table('contact_tag')
                           ->where('contact_id', $edit->id)
                           ->get();
                         
                            if($tags != [] ||$tags != '' || $tags != undefined){
                                foreach ($tags as $keys => $values) {
                                    $tg = DB::table('tags')->where('id', $values->tag_id)->get();
                                    $tags[$keys] = $tg[0];
                                 }
                            $edit->tags = $tags;
                            }


        return $edit;                            
    }
 
    
    // Code for Updating Contact
    public function update(Request $request,$id)
    {
        // get the contact
        $update = contact::find($id);
       
       // return $request->input('firstname');
        // show the edit form and pass the form
        $update->photo = $request->input('photo');
        $update->firstname = $request->input('firstname');
        $update->lastname = $request->input('lastname');
        $update->email = $request->input('email');
        $update->address1 = $request->input('address1');
        $update->address2 = $request->input('address2');       
        $update->phone = $request->input('phone');
        $update->city = $request->input('city');
        $update->pin = $request->input('pin');
        $update->country = $request->input('country');
        $update->company = $request->input('company');
        $update->source = $request->input('source');
        $update->tag()->detach();
        $updateid = $update->id;
        $updateTags = $request->updatetag;
 
        foreach($updateTags as $tag)
         {
             try{

                $index = DB::table('tags')
                           ->where('name', $tag['name'])
                           ->get();
                           // return sizeof($index);
                           if (sizeof($index) == '0') {
                               $newtag=  new Tag();
                               $newtag->id = $tag['id'];
                               $newtag->name = $tag['name'];
                               $newtag->user_id= $request->input('userid');
                               $newtag->save();

                               $update->tag()->attach($tag['id']);
                           }else {

                                  $update->tag()->attach($tag['id']);
                                }
             }
            catch(\Illuminate\Database\QueryException $e){
             $update->tag()->attach($tag['id']);

            }
         }     
        
       $update->save();
    }    


    
    //Code for Deleting Contact
    public function destroy($id)
    {
        // delete
        $delete = contact::find($id);
        $tid=Tag::find($id);
        $delete->Tag()->detach($tid);
        $delete->delete();

    }

    
    //Search by Tag  from angular recvd:
    public function findtag(Request $request)
    {   
        
        $uids = $request->uid;
        $id = $request->x;
        
        $tag = Tag::find($id)
                  ->contact()
                  ->where('user_id',$uids)
                  ->get();

        if($tag->isEmpty())
        {
            return "No Tag Available";
        }
        
        else
        {
            foreach ($tag as $key => $value)
            { 
                $tags = DB::table('contact_tag')
                               ->where('contact_id', $value->id)
                               ->get();
               if($tags != [] ||$tags != '' || $tags != undefined)
               {
                    foreach ($tags as $keys => $values) 
                    {
                        $tg = DB::table('tags')->where('id', $values->tag_id)->pluck('name');
                        $tags[$keys] = $tg;
                    }
                    $tag[$key]->tags = $tags;
                }
            }
            return $tag;
        }
    }

    public function allmanagetag($id)
    {   
        $tag = Tag::find($id)
                  ->contact()
                  ->get();

        if($tag->isEmpty())
        {
            return "No Tag Available";
        }
        
        else
        {
            foreach ($tag as $key => $value)
            { 
                $tags = DB::table('contact_tag')
                               ->where('contact_id', $value->id)
                               ->get();
               if($tags != [] ||$tags != '' || $tags != undefined)
               {
                    foreach ($tags as $keys => $values) 
                    {
                        $tg = DB::table('tags')->where('id', $values->tag_id)->pluck('name');
                        $tags[$keys] = $tg;
                    }
                    $tag[$key]->tags = $tags;
                }
            }
            return $tag;
        }
    }


    public function suggtags(Request $request)
    {   
        $text = '%'.$request->suggtag.'%';
        $tags = DB::table('tags')
               ->where('name','like', $text)
               ->orderBy('name', 'asc')
               ->get();
        return $tags;
    }
    
    /*Anything keyword search*/
     public function findkeyword(Request $request)
    {  
        $text = '%'.$request->text.'%';
        $userid = $request->uid;
        $word=[];

        
                $keyword = DB::table('contacts')
                               ->where('user_id',$userid)
                               ->where('firstname', 'like', $text)
                               ->orWhere('user_id',$userid)
                               ->where('lastname', 'like', $text)
                               ->orWhere('user_id',$userid)
                               ->where('phone', 'like', $text)
                               ->orWhere('user_id',$userid)
                               ->where('email','like',$text)
                               ->orWhere('user_id',$userid)
                               ->where('city','like',$text)
                               ->orWhere('user_id',$userid)
                               ->where('company','like',$text)
                               ->get();
         /*Condition for search by Tag in Anything Search*/
         if($keyword==[])
         {
          $ee = DB::table('tags')
                        ->where('name','like',$text)
                        ->join('contact_tag','tags.id','=','contact_tag.tag_id')
                        ->pluck('contact_id');
              for($i=0;$i<sizeof($ee);$i++)
              {
                $keywords =  DB::table('contacts')
                        ->where('user_id',$userid)
                        ->where('id',$ee[$i])
                        ->get();
                      array_push($word, $keywords);
              }
                $keyword = array_flatten($word);
                foreach ($keyword as $key => $value)
                {
                  $tags = DB::table('contact_tag')
                                 ->where('contact_id', $value->id)
                                 ->get();
                  if($tags != [] ||$tags != '' || $tags != undefined)
                   {
                        foreach ($tags as $keys => $values) 
                        {
                            $tg = DB::table('tags')->where('id', $values->tag_id)->pluck('name');
                            $tags[$keys] = $tg;
                        }
                        $keyword[$key]->tags = $tags;
                    }
                }                      
         }            
        else          

        foreach ($keyword as $key => $value)
        {
            $tags = DB::table('contact_tag')
                           ->where('contact_id', $value->id)
                           ->get();
                           if($tags != [] ||$tags != '' || $tags != undefined)
                           {
                                foreach ($tags as $keys => $values) 
                                {
                                    $tg = DB::table('tags')->where('id', $values->tag_id)->pluck('name');
                                    $tags[$keys] = $tg;
                                }
                                $keyword[$key]->tags = $tags;
                            }
        }         
        return $keyword;
    }

    

     /*Name keyword search*/
     public function namekeyword(Request $request)
    {  
        $userid = $request->uid;

        $text = '%'.$request->text.'%';
        $name = DB::table('contacts')
               ->where('user_id',$userid)
               ->where('firstname', 'like', $text)
               ->orWhere('user_id',$userid)
               ->where('lastname', 'like', $text)
               ->get();
               return $name;
        foreach ($name as $key => $value)
        {
            $tags = DB::table('contact_tag')
                           ->where('contact_id', $value->id)
                           ->get();
                           if($tags != [] ||$tags != '' || $tags != undefined)
                           {
                                foreach ($tags as $keys => $values) 
                                {
                                    $tg = DB::table('tags')->where('id', $values->tag_id)->pluck('name');
                                    $tags[$keys] = $tg;
                                }
                                $name[$key]->tags = $tags;
                            }
        }
        return $name;
    }

   
    /*email keyword search*/
    public function emailkeyword(Request $request)
    {  
        $userid = $request->uid;
        $text = '%'.$request->text.'%';
        $email = DB::table('contacts')
               ->where('user_id',$userid)       
               ->where('email', 'like', $text)
               ->get();
        foreach ($email as $key => $value)
            {
                $tags = DB::table('contact_tag')
                               ->where('contact_id', $value->id)
                               ->get();
                               if($tags != [] ||$tags != '' || $tags != undefined)
                               {
                                    foreach ($tags as $keys => $values) 
                                    {
                                        $tg = DB::table('tags')->where('id', $values->tag_id)->pluck('name');
                                        $tags[$keys] = $tg;
                                    }
                                    $email[$key]->tags = $tags;
                                }
            }
            return $email;           
    }


    
     /*phone keyword search*/
    public function phonekeyword(Request $request)
    {   
        $userid = $request->uid;
        $text = '%'.$request->text.'%';
        $phone = DB::table('contacts')
               ->where('user_id',$userid)        
               ->where('phone', 'like', $text)
               ->get();
        foreach ($phone as $key => $value)
            {
                $tags = DB::table('contact_tag')
                               ->where('contact_id', $value->id)
                               ->get();
                               if($tags != [] ||$tags != '' || $tags != undefined)
                               {
                                    foreach ($tags as $keys => $values) 
                                    {
                                        $tg = DB::table('tags')->where('id', $values->tag_id)->pluck('name');
                                        $tags[$keys] = $tg;
                                    }
                                    $phone[$key]->tags = $tags;
                                }
            }
            return $phone;       
    }

     
     /*city keyword search*/
    public function citykeyword(Request $request)
    {  
        $userid = $request->uid;
        $text = '%'.$request->text.'%';
        $city = DB::table('contacts')
               ->where('user_id',$userid)                
               ->where('city', 'like', $text)
               ->get();
         foreach ($city as $key => $value)
            {
                $tags = DB::table('contact_tag')
                               ->where('contact_id', $value->id)
                               ->get();
                               if($tags != [] ||$tags != '' || $tags != undefined)
                               {
                                    foreach ($tags as $keys => $values) 
                                    {
                                        $tg = DB::table('tags')->where('id', $values->tag_id)->pluck('name');
                                        $tags[$keys] = $tg;
                                    }
                                    $city[$key]->tags = $tags;
                                }
            }
            return $city;    
    }

     
    /*company keyword search*/
    public function compkeyword(Request $request)
    {   
        $userid = $request->uid;  
        $text = '%'.$request->text.'%';
        $company = DB::table('contacts')
               ->where('user_id',$userid)                       
               ->where('company', 'like', $text)
               ->get();
         foreach ($company as $key => $value)
            {
                $tags = DB::table('contact_tag')
                               ->where('contact_id', $value->id)
                               ->get();
                               if($tags != [] ||$tags != '' || $tags != undefined)
                               {
                                    foreach ($tags as $keys => $values) 
                                    {
                                        $tg = DB::table('tags')->where('id', $values->tag_id)->pluck('name');
                                        $tags[$keys] = $tg;
                                    }
                                    $company[$key]->tags = $tags;
                                }
            }
        return $company;  
    }

    /*tag keyword search*/
    public function tagkeyword(Request $request)
    {  
        $allcontactid=[];
        $allcontact=[];
        $userid = $request->uid;
        $text = '%'.$request->text.'%';
     
        $tags = DB::table('tags')
               ->where('name', 'like', $text)->pluck('id');
         

            for($i=0;$i<sizeof($tags);$i++)
        {
             $contactid = DB::table('contact_tag')
                              ->where('tag_id',$tags[$i])->pluck('contact_id');
             
             array_push($allcontactid,$contactid);
         }  
     
            $array = array_collapse($allcontactid);
     
        for($i=0;$i<sizeof($array);$i++)
        {
            $contact = DB::table('contacts')
                              ->where('user_id',$userid)                            
                              ->where('id',$array[$i])->get();
             array_push($allcontact,$contact);
        }    
        $tagcontact=array_flatten($allcontact);
        


        foreach ($tagcontact as $key => $value)
        {
            $tags = DB::table('contact_tag')
                           ->where('contact_id', $value->id)
                           ->get();
                            if($tags != [] ||$tags != '' || $tags != undefined)
                            {
                                foreach ($tags as $keys => $values) 
                                {
                                    $tg = DB::table('tags')->where('id', $values->tag_id)->pluck('name');
                                    $tags[$keys] = $tg;

                                }
                                $tagcontact[$key]->tags = $tags;
                            }
        }               
        return $tagcontact;    
    }
     
    //Code for Deleting Tag
    public function destroytag($id)
    {
        // delete
        $delete = Tag::find($id);
        $cid=contact::find($id);
        $delete->contact()->detach($cid);
        $delete->delete();
    }

    //Code for  Editing Tag
    public function edittag($id)
    {
        // get the contact
        $edit = Tag::find($id);

        // show the edit form and pass the form
        return $edit;
    } 

    public function updatetag(Request $request,$id)
    {
        // get the tag
        $updatetag = Tag::find($id);
        //return $updatetag;

        // show the edit form and pass the form
        $updatetag->name = $request->input('tagname'); 
        $updatetag->save();  
        return $updatetag;
    }

    public function poptag($id)
    {
       // return 'dd';
        $tagid=DB::table('populartags')->where('user_id',$id)->pluck('tag_id');
          
        
        // Load all subjects which match the ids within the subjectIds array
        $tagname = Tag::whereIn('id',$tagid)->get();
         return $tagname;

          if($tagname->isEmpty())
        {
            return "notag";
        }
        
        else
        {
            return $tagname;
        }
    }

    public function newpass(Request $request,$id)
    {

        //return $request->email;
        //$update = user::find($id);
        $email = DB::table('users')->where('id',$id)->value('email');
        $pass = DB::table('users')->where('id',$id)->value('password'); 
        if($email == $request->email && $pass == $request->oldpass ){
          $update = user::find($id);
          $update->password = $request->input('newpass');
          $update->save();
         return $update;
        }
        else
        {
            return 'Wrong Credentials';
        }
        


        //   $update = user::find($id);
        //   $update->password = $request->input('password');
        //   $update->save();
        //  return $update;
           
    }


    public function name($id)
    {  
        $allTags = [];
         $users=DB::table('contact_tag')->where('contact_id',$id)->pluck('tag_id');

         for ($i=0; $i < sizeof($users); $i++) { 
            $tag=DB::table('tags')->where('id',$users[$i])->pluck('name');
            array_push($allTags,$tag);
             // return $allTags;
         }
         
        return $allTags;
        //return $users;
    }

    public function contactcards($id)
    {  
        $allContacts = [];
         $users=DB::table('contact_tag')->where('tag_id',$id)->pluck('contact_id');

         for ($i=0; $i < sizeof($users); $i++) { 
            $contact=DB::table('contacts')->where('id',$users[$i])->get();
            array_push($allContacts,$contact);
             // return $allTags;
         }
         
        return $allContacts;
        //return $users;
    }
}
