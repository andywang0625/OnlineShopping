<?php
/*
 * @Author: Kanade
 * @Date: 2020-05-01 15:29:37
 * @LastEditTime: 2020-05-01 15:31:34
 * @Description:
 */

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTagsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tags', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string("tag")->charset("utf8")->nullable(false);
            $table->text("description")->charset("utf8");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tags');
    }
}
