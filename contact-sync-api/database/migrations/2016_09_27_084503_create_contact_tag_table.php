<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateContactTagTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
     Schema::create('contact_tag'   , function (Blueprint $table) {
        $table->increments('id');

        $table->integer('tag_id')->unsigned();
        $table->foreign('tag_id')->references('id')->on('tags');

        $table->integer('contact_id')->unsigned();
        $table->foreign('contact_id')->references('id')->on('contacts');
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
        Schema::drop('contact_tag');
    }
}
