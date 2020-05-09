<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAdminsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('admins', function (Blueprint $table) {
            $table->bigIncrements('id')->nullable(false)->unique();
            $table->string("name", 100)->charset('utf8')->nullable(false)->unique();
            $table->string("password", 100)->charset('utf8')->nullable(false);
            $table->string("email", 100)->charset('utf8')->nullable(false)->unique();
            $table->string('api_token', 80)->unique()->nullable()->default(null);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('admins');
    }
}
