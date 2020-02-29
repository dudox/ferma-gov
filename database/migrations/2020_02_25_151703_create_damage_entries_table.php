<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDamageEntriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('damage_entries', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->text('location');
            $table->string('phone');
            $table->string('identifier');
            $table->json('images')->nullable();
            $table->json('geolocation')->nullable();
            $table->integer('type');
            $table->integer('status')->default(1);
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
        Schema::dropIfExists('damage_entries');
    }
}
