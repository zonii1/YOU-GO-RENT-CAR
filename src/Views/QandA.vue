<template>
  <v-container class="mt-5">

    <v-card color="pink" class="mx-auto qna-card">

      <v-card-title class="text-center">
        <h2>Frequently Asked Questions</h2>
      </v-card-title>

      <v-expansion-panels v-for="(item, index) in questions" :key="index">
        <v-expansion-panel
            class="ma-3"
            :title="item.question"
            :text="item.answer"
        >
        </v-expansion-panel>
      </v-expansion-panels>




    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      questions: [
        {
          question: 'How do I rent a car?',
          answer: 'To rent a car, simply browse our selection, choose a car, and complete the rental form.'
        },
        {
          question: 'What are the payment options?',
          answer: 'We accept credit cards, debit cards, and other online payment methods.'
        },
        {
          question: 'Can I cancel my booking?',
          answer: 'Yes, you can cancel your booking up to 24 hours before your rental time for a full refund.'
        },
        {
          question: 'Do you offer insurance?',
          answer: 'Yes, we offer rental insurance packages for an additional fee.'
        },
        {
          question: 'Can I pick up the car in one city and drop it off in another?',
          answer: 'Yes, but please note that additional fees may apply.'
        }
      ]
    };
  }
};
</script>

<style scoped>
.qna-card {
  max-width: 800px;
  margin: auto;
  padding: 20px;
}

.v-expansion-panel-header {
  font-weight: bold;
  color: #424242;
  transition: background-color 0.3s ease;
  cursor: pointer;
}

.v-expansion-panel-header:hover {
  background-color: #f5f5f5;
}

.v-expansion-panel-content {
  font-size: 16px;
  line-height: 1.5;
  color: #616161;
  background-color: #fafafa;
}

.v-icon {
  color: #2196f3;
}
</style>
