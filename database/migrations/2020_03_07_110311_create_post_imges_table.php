<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePostImgesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('post_imges', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('postid');
            $table->string("filename")->unique();
            $table->timestamps();
            $table->foreign('postid')->references('id')->on('posts');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('post_imges');
    }
}
