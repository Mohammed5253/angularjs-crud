<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateContactsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('contacts',function (Blueprint $table) {

            $table->increments('id');
            $table->longText('photo')->nullable();
            $table->string('firstname')->nullable();
            $table->string('lastname')->nullable();
            $table->string('email')->nullable();
            $table->string('phone')->nullable();
            $table->string('address1')->nullable();
            $table->string('address2')->nullable();
            $table->string('pin')->nullable();
            $table->string('city')->nullable();
            $table->string('country')->nullable();
            $table->string('longitude')->nullable();
            $table->string('latitude')->nullable();
            $table->string('company')->nullable();
            $table->string('source')->nullable();
            $table->string('tag')->nullable();
            $table->string('created_by');
            $table->integer('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users');
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
        Schema::drop('contacts');
    }
}
