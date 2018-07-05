<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePopulartagsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       Schema::create('populartags',function (Blueprint $table) {

        $table->increments('id');

        $table->integer('user_id')->unsigned();
        $table->foreign('user_id')->references('id')->on('users');

        $table->integer('tag_id')->unsigned();
        $table->foreign('tag_id')->references('id')->on('tags');
        
        $table->softDeletes();  
        $table->timestamps();
    }); 
   }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('populartags');
    }
}
