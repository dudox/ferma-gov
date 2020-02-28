<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDamageScreensTable extends Migration
{
    /**
     * Run the migrations.
     * Holds the welcome screen and pulls options from DamageType Model if order = 1
     * @return void
     */
    public function up()
    {
        Schema::create('damage_screens', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('value');
            $table->integer('order');
            $table->tinyInteger('con');
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
        Schema::dropIfExists('damage_screens');
    }
}
